import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-exclusao',
  template: `
    <h2 mat-dialog-title>Confirmar Exclusão</h2>
    <mat-dialog-content>Deseja realmente excluir este usuário?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="warn"  (click)="fechar()">Cancelar</button>
      <button mat-button color="primary" (click)="confirmar()">Confirmar</button>
    </mat-dialog-actions>
  `
})
export class ConfirmarExclusaoComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmarExclusaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  fechar(): void {
    this.dialogRef.close(false); // cancelado
  }

  confirmar(): void {
    this.dialogRef.close(true); // confirmado
  }
}
