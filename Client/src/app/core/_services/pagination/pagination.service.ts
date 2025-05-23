import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PaginationState {
  offset: number;
  limit: number;
  isLoading: boolean;
  reachedEnd: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private paginationState = new BehaviorSubject<PaginationState>({
    offset: 0,
    limit: 20,
    isLoading: false,
    reachedEnd: false,
  });

  getPaginationState(): Observable<PaginationState> {
    return this.paginationState.asObservable();
  }

  getCurrentState(): PaginationState {
    return this.paginationState.value;
  }

  setLoading(isLoading: boolean): void {
    this.paginationState.next({
      ...this.paginationState.value,
      isLoading,
    });
  }

  setReachedEnd(reachedEnd: boolean): void {
    this.paginationState.next({
      ...this.paginationState.value,
      reachedEnd,
    });
  }

  resetPagination(limit?: number): void {
    this.paginationState.next({
      offset: 0,
      limit: limit || this.paginationState.value.limit,
      isLoading: false,
      reachedEnd: false,
    });
  }

  nextPage(): void {
    const currentState = this.paginationState.value;
    if (!currentState.isLoading && !currentState.reachedEnd) {
      this.paginationState.next({
        ...currentState,
        offset: currentState.offset + currentState.limit,
        isLoading: true,
      });
    }
  }
}
