import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzUploadFile } from 'ng-zorro-antd';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { ProjectInfo } from 'src/app/models/project-info';
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
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  @ViewChild(FormGroupDirective) myForm: any;
  projUploadingForm: FormGroup;
  phonemask = [/[0-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  category = ["Interior Design", "Architecture", "Landscape Architecture", "Engineering"];
  projectInfo: ProjectInfo = new ProjectInfo();
  public form = {
    projName: new FormControl('', [Validators.required]),
    clientName: new FormControl('', [Validators.required]),
    projDescription: new FormControl('', [Validators.required]),
    projCategory: new FormControl('', [Validators.required]),
    clientContact: new FormControl('', [Validators.required]),
    projImages: new FormControl('', [Validators.required]),
    projIcon: new FormControl('', [Validators.required]),
    projDetail: new FormControl('', [Validators.required]),
  }
  constructor(
    private fb: FormBuilder,
    private Jarwis: AuthService,
    private snotifyService: ToastrService,    

  ) { }

  createForm() {
    this.projUploadingForm = this.fb.group(this.form);
    this.checkValidation();
  }
  checkValidation() {
    this.projUploadingForm.get('clientContact').valueChanges.subscribe(val => {
      let rep = /_/gi;
      let rep1 = /-/gi;
      if (this.form.clientContact.value) {
        let phoneNumber = this.form.clientContact.value.replace(rep, '').replace(rep1, '');
        if (phoneNumber.length > 0 && phoneNumber.length < 11) {
          this.projUploadingForm.get('clientContact').setErrors({ 'notFull': true });
        }
      }
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
  option = [];
  // memberImageData: MemberInfo = new MemberInfo();

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
        this.projUploadingForm.patchValue({
          projImages: reader.result
        });
      }
    };

    return false;
  };
  onRemove = (file: NzUploadFile): boolean => {
    if (this.fileList.length == 1) {
      this.projUploadingForm.patchValue({
        projImages: ''
      });
    }

    return true;
  };
  fileList1: NzUploadFile[] = [];
  previewImage1: string | undefined = '';
  previewVisible1 = false;
  handlePreview1 = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage1 = file.url || file.preview;
    this.previewVisible1 = true;
  };
  beforeUpload1 = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.readAsDataURL(file as unknown as File);
    reader.onload = () => {
      file.preview = reader.result;
      file.originFileObj = file as unknown as File;
      this.fileList1 = this.fileList1.concat(file);
      if (this.fileList1.length > 0) {
        this.projUploadingForm.patchValue({
          projIcon: reader.result
        });
      }
    };

    return false;
  };
  onRemove1 = (file: NzUploadFile): boolean => {
    if (this.fileList1.length == 1) {
      this.projUploadingForm.patchValue({
        projIcon: ''
      });
    }

    return true;
  };

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
  onSubmit() {
    if (this.projUploadingForm.invalid) {
      return
    }
    this.projectInfo.projName = this.form.projName.value;
    this.projectInfo.projDescription = this.form.projDescription.value;
    this.projectInfo.clientContact = this.form.clientContact.value;
    this.projectInfo.clientName = this.form.clientName.value;
    this.projectInfo.projCategory = this.form.projCategory.value;
    this.projectInfo.projDetail = this.form.projDetail.value;
    this.projectInfo.imageData = [];
    this.fileList1.forEach(file => {
      let imgData = new ProjectImagesInfo();
      imgData.file = file.preview;
      imgData.imgPath = file.name;
      imgData.type = "Icon";
      this.projectInfo.imageData.push(imgData);
    });
    this.fileList.forEach(file => {
      let imgData = new ProjectImagesInfo();
      imgData.file = file.preview;
      imgData.imgPath = file.name;
      imgData.type = "Carousel";
      this.projectInfo.imageData.push(imgData);
    });
    debugger
    this.Jarwis.addProject(this.projectInfo).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    )
  }
  handleData(data){
    this.myForm.resetForm();
    this.fileList=[];
    this.fileList1=[];
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
  SelectedProjCategory(val) {
    this.form.projCategory.value
  }
  getprojNameError() {
    return this.form.projName.hasError('required') ? 'You must enter project name' : '';
  }
  getprojDescriptionError() {
    return this.form.projDescription.hasError('required') ? 'You must enter project description' : '';
  }
  getclientNameError() {
    return this.form.clientName.hasError('required') ? 'You must enter client name' : '';
  }
  getclientContactError() {
    return this.form.clientContact.hasError('required') ? 'You must enter client contact no' :
      this.form.clientContact.hasError('notFull') ? 'You must enter complete client contact no' : '';
  }
  getprojImagesError() {
    return this.form.projImages.hasError('required') ? 'You must select project images' : '';
  }
  getprojIconError() {
    return this.form.projIcon.hasError('required') ? 'You must select project icon' : '';
  }
  getprojDetailError() {
    return this.form.projDetail.hasError('required') ? 'You must enter project details' : '';
  }
  getprojCategoryError() {
    return this.form.projCategory.hasError('required') ? 'You must select project category' : '';
  }
}
