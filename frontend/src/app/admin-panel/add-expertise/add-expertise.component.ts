import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzUploadFile } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ExpertiseInfo } from 'src/app/models/expertise-info';
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
  selector: 'app-add-expertise',
  templateUrl: './add-expertise.component.html',
  styleUrls: ['./add-expertise.component.css']
})
export class AddExpertiseComponent implements OnInit {

  @ViewChild(FormGroupDirective) myForm1: any;
  addExpertyForm: FormGroup;
  expertySectionForm: FormGroup;
  expertyInfo = new ExpertiseInfo();
  case="case1";
  public expertyForm = {
    image: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  }
  public detailForm = {
    detail: new FormControl('', [Validators.required]),
  }
  constructor(
    private route: ActivatedRoute,
    private Jarwis: AuthService,
    private snotifyService: ToastrService,
    private fb: FormBuilder,
  ) {
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
    this.getDetails();
  }
  createForm() {
    this.addExpertyForm = this.fb.group(this.expertyForm);
    this.expertySectionForm = this.fb.group(this.detailForm);

  }
  getDetails() {
    this.Jarwis.getExpertySectionDetail().subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
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
        this.addExpertyForm.patchValue({
          image: reader.result
        });
      }
    };

    return false;
  };
  onRemove = (file: NzUploadFile): boolean => {
    if (this.fileList.length == 1) {
      this.addExpertyForm.patchValue({
        image: ''
      });
    }

    return true;
  };
  onSubmit1() {
    if (this.expertySectionForm.invalid) {
      return
    }
    this.expertyInfo.detail=this.detailForm.detail.value;
    this.Jarwis.addExpertySectionDetail(this.expertyInfo).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }
  onSubmit() {
    this.case="case3"
    if (this.addExpertyForm.invalid) {
      return
    }
    this.expertyInfo.type = this.expertyForm.type.value;

    this.expertyInfo.imageData = [];
    this.fileList.forEach(file => {
      let imgData = new ProjectImagesInfo();
      imgData.file = file.preview;
      imgData.imgPath = file.name;
      imgData.type = this.expertyForm.type.value;
      this.expertyInfo.imageData.push(imgData);
    });
    this.Jarwis.addExperty(this.expertyInfo).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }
  handleData(data) {
    if(this.case=='case1'){
      this.detailForm.detail.setValue(data.data[0].detail);
    }
    else{
      this.fileList = [];
      this.expertyForm.type.reset();
      this.snotifyService.clear();
      this.snotifyService.success(data.msg, "", {
        timeOut: 2000,
        closeButton: true,
      });
    }   
  }
  handleError(error) {
    this.snotifyService.clear();
    this.snotifyService.error(error.error.reason, '', {
      closeButton: true,
    });
  }
  getDetailError() {
    return this.detailForm.detail.hasError('required') ? 'You must enter details of expertise' : '';
  }
  getImageError() {
    return this.expertyForm.image.hasError('required') ? 'You must select image' : '';
  }
  getTypeError() {
    return this.expertyForm.type.hasError('required') ? 'You must enter experty' : '';
  }
}
