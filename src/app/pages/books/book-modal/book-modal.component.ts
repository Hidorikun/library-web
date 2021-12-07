import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {

  @Input()
  modal: any;

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.maxLength(65535)],
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.formGroup.get(fieldName);

    if (field.getError('required')) {
      return 'This field is required';
    }

    if (field.getError('maxlength')) {
      return 'The description must be shorter than ' + field.getError('maxlength').max + ' characters';
    }
  }

  shouldShowErrors(fieldName: string) {
    return !this.formGroup.get(fieldName).valid
      && (this.formGroup.get(fieldName).dirty || this.formGroup.get(fieldName).touched)
  }

  save() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      this.modal.close({
        title: this.formGroup.get('title').value,
        description: this.formGroup.get('description').value,
      })
    }
  }
}
