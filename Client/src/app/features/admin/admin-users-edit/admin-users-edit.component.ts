import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-users-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users-edit.component.html',
  styleUrl: './admin-users-edit.component.scss',
})
export class AdminUsersEditComponent implements OnInit {
  private route = inject(ActivatedRoute);

  userId: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      console.log('User ID:', this.userId);
    });
  }
}
