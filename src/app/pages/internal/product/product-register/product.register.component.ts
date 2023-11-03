import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductRequest } from '../../../../models/request/product.request';
import { ProductService } from '../../../../services/product.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DateFormatService } from '../../../../shared/services/date-format.service';

@Component({
  selector: 'app-dsbn-product.register',
  templateUrl: './product.register.component.html',
  styleUrls: ['./product.register.component.scss'],
})
export class ProductRegisterComponent implements OnInit {
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
    this.formGroup = this.formBuilder.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern(/^[a-zA-Z0-9-]*$/),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
        ],
      ],
      dateRelease: [
        this.dateFormatService.transform(this.today),
        [Validators.required],
      ],
      dateRevision: [
        this.dateFormatService.transform(
          this.dateFormatService.addYears(this.today)
        ),
        [Validators.required],
      ],
    });

    this.controlDateRelease?.valueChanges.subscribe((value) => {
      this.controlDateRevision?.setValue(
        this.dateFormatService.transform(this.dateFormatService.addYears(value))
      );
    });
  }

  protected get controlId() {
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
    this.controlId?.setValue('');
    this.controlName?.setValue('');
    this.controlDescription?.setValue('');
    this.controlLogo?.setValue('');
    this.controlDateRelease?.setValue(
      this.dateFormatService.transform(this.today)
    );
    this.controlDateRevision?.setValue(
      this.dateFormatService.transform(this.today)
    );
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const request = new ProductRequest(this.formGroup.value);
      this.productService.verificationProduct(request.id).subscribe({
        next: (response) => {
          if (!response) {
            this.productService.createdProduct(request).subscribe({
              next: (response) => {
                this.toastService.showToast({
                  title: 'Producto Registrado',
                  description: 'El producto se ha registrado correctamente.',
                  severity: 'success',
                  autoClosing: true,
                });
              },
              error: (error) => {
                this.toastService.showToast({
                  title: 'Oops',
                  description: 'Ha ocurrido un error al registrar el producto.',
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
              title: 'ID existente',
              description:
                'El producto que intenta registrar tiene un ID ya registrado, pruebe con otro.',
              severity: 'warn',
              autoClosing: true,
            });
          }
        },
        error: (error) => {
          this.toastService.showToast({
            title: 'Oops',
            description: 'Ha ocurrido un error al validar el producto.',
            severity: 'error',
            autoClosing: true,
          });
        },
        complete: () => {},
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
