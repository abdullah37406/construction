import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzUploadFile } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { AboutUsInfo } from 'src/app/models/aboutUs-info';
import { ProjectImagesInfo } from 'src/app/models/projectImages-info';
function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-edit-about-us',
  templateUrl: './edit-about-us.component.html',
  styleUrls: ['./edit-about-us.component.css']
})
export class EditAboutUsComponent implements OnInit {
  @ViewChild(FormGroupDirective) myForm: any;
  editAboutSectionForm: FormGroup;
  condition ;
  aboutUs=new AboutUsInfo();
  public form = {
    sideImage: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
  }
  constructor(
    private route: ActivatedRoute,
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
    private fb: FormBuilder,
  ) {
    // this.condition = this.route.snapshot.params.our;
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '150px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    outline: true,
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };
  ngOnInit(): void {
    this.createForm();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.condition = params.get('our')
    })
    debugger

  }
  createForm() {
    this.editAboutSectionForm = this.fb.group(this.form);
  }
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
  beforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.readAsDataURL(file as unknown as File);
    reader.onload = () => {
      file.preview = reader.result;
      file.originFileObj = file as unknown as File;
      this.fileList = this.fileList.concat(file);
      if (this.fileList.length > 0) {
        this.editAboutSectionForm.patchValue({
          sideImage: reader.result
        });
      }
    };

    return false;
  };
  onRemove = (file: NzUploadFile): boolean => {
    if (this.fileList.length == 1) {
      this.editAboutSectionForm.patchValue({
        sideImage: ''
      });
    }

    return true;
  };

  onSubmit() {
    if(this.editAboutSectionForm.invalid){
      return
    }
    this.aboutUs.detail=this.form.detail.value;
    this.aboutUs.type=this.condition;
    
    this.aboutUs.imageData = [];
    this.fileList.forEach(file => {
      let imgData = new ProjectImagesInfo();
      imgData.file = file.preview;
      imgData.imgPath = file.name;
      imgData.type = this.condition;
      this.aboutUs.imageData.push(imgData);
    });
    debugger
    this.Jarwis.addAboutUsInfo(this.aboutUs).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }
  handleData(data){
    this.myForm.resetForm();
    this.fileList=[];
    this.snotifyService.clear();
    this.snotifyService.success("Project Added", "", {
      timeOut: 2000,
      closeButton: true,
    });
  }
  handleError(error){
    this.snotifyService.clear();
    this.snotifyService.error(error.error.reason, '', {
      closeButton: true,
    });
  }
  getSideImageError() {
    return this.form.sideImage.hasError('required') ? 'You must select image' : '';
  }
  getDetailError() {
    return this.form.detail.hasError('required') ? 'You must enter details' : '';
  }
}
