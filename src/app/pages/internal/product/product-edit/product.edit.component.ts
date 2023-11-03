import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductRequest } from '../../../../models/request/product.request';
import { ProductService } from '../../../../services/product.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DateFormatService } from '../../../../shared/services/date-format.service';

@Component({
  selector: 'app-dsbn-product.edit',
  templateUrl: './product.edit.component.html',
  styleUrls: ['./product.edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  formGroup!: FormGroup;

  protected today = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastService: ToastService,
    private dateFormatService: DateFormatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const data = history.state;

    this.formGroup = this.formBuilder.group({
      id: [
        data?.id ?? '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern(/^[a-zA-Z0-9-]*$/),
        ],
      ],
      name: [
        data?.name ?? '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        data?.description ?? '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: [
        data?.logo ?? '',
        [
          Validators.required,
          Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
        ],
      ],
      dateRelease: [
        data?.dateRelease
          ? this.dateFormatService.transform(data.dateRelease)
          : this.dateFormatService.transform(this.today),
        [Validators.required],
      ],
      dateRevision: [
        data?.dateRevision
          ? this.dateFormatService.transform(data.dateRevision)
          : this.dateFormatService.transform(this.today),
        [Validators.required],
      ],
    });

    this.controlDateRelease?.valueChanges.subscribe((value) => {
      this.controlDateRevision?.setValue(
        this.dateFormatService.transform(this.dateFormatService.addYears(value))
      );
    });
  }

  private get controlId() {
    return this.formGroup.get('id');
  }
  protected get controlName() {
    return this.formGroup.get('name');
  }
  protected get controlDescription() {
    return this.formGroup.get('description');
  }
  protected get controlLogo() {
    return this.formGroup.get('logo');
  }
  protected get controlDateRelease() {
    return this.formGroup.get('dateRelease');
  }
  protected get controlDateRevision() {
    return this.formGroup.get('dateRevision');
  }

  onResetForm(): void {
    const data = history.state;

    this.controlId?.setValue(data?.id ?? '');
    this.controlName?.setValue(data?.name ?? '');
    this.controlDescription?.setValue(data?.description ?? '');
    this.controlLogo?.setValue(data?.logo ?? '');
    this.controlDateRelease?.setValue(
      data?.dateRelease
        ? this.dateFormatService.transform(data.dateRelease as Date)
        : this.dateFormatService.transform(this.today)
    );
    this.controlDateRevision?.setValue(
      data?.dateRevision
        ? this.dateFormatService.transform(data.dateRevision as Date)
        : this.dateFormatService.transform(this.today)
    );
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const request = new ProductRequest(this.formGroup.value);
      this.productService.editProduct(request).subscribe({
        next: (response) => {
          this.toastService.showToast({
            title: 'Producto Editado',
            description: 'El producto se ha editado correctamente.',
            severity: 'success',
            autoClosing: true,
          });
        },
        error: (error) => {
          this.toastService.showToast({
            title: 'Oops',
            description: 'Ha ocurrido un error al editar el producto.',
            severity: 'error',
            autoClosing: true,
          });
        },
        complete: () => {
          this.router.navigate(['/products']);
        },
      });
    } else {
      this.toastService.showToast({
        title: 'Campos Incompletos o Inválidos',
        description: 'Debe completar los campos requeridos.',
        severity: 'warn',
        autoClosing: true,
      });
      Object.values(this.formGroup.controls).map((controlName) => {
        controlName.markAsTouched();
      });
    }
  }
}
