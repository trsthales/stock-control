import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryEvent } from 'src/app/models/enums/categories/CategoryEvent';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/event/EditCategoryAction';
import { EventAction } from 'src/app/models/interfaces/categories/event/EventAction';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesResponse';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: []
})
export class CategoriesTableComponent {

  public categorySelected!: GetCategoriesResponse;
  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;

  @Input() public categories: Array<GetCategoriesResponse> = [];
  @Output() categoryEvent = new EventEmitter<EditCategoryAction>();

  handleCategoryEvent(action: string, id?: string, categoryName?: string): void{
    if(action && action !== ''){
      this.categoryEvent.emit({action,id,categoryName});
    }
  }

}
