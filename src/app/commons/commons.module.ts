/*
 * 公用module，引入共用的模块、指令等
 * @Author: chang.liu 
 * @Email: i@liuchang.org 
 * @Date: 2018-06-06 11:32:17 
 * @Last Modified by: chang.liu
 * @Last Modified time: 2018-08-06 15:14:51
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { LoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';

// 第三方组件
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';

import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelModule } from 'primeng/panel';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DataTableModule } from 'primeng/datatable';
import { TableModule } from 'primeng/table';
import { FieldsetModule } from 'primeng/fieldset';
import { GrowlModule } from 'primeng/growl';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// 自定义组件
import { LayoutComponent } from './layout/layout.component';
import { AppTabMenusComponent } from './app-tab-menus/app-tab-menus.component';
import { BasePageComponent } from './base-page/base-page.component';
import { BasePageToolbarComponent } from './base-page-toolbar/base-page-toolbar.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { AppAmountInput } from './app-components/app-amount-input.component';
import { AppAutocomplete } from './app-components/app-autocomplete.component';
import { AppDateInput } from './app-components/app-date-input.component';
import { AppComboBox } from './app-components/app-combobox.component';
import { AppRateInput } from './app-components/app-rate-input.component';

// 自定义指令
import { RequiredDirective } from './directives/required';

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, FormsModule, LoadingModule, MatToolbarModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, ToolbarModule, PanelMenuModule, ButtonModule, SidebarModule, InputTextModule, ScrollPanelModule, PanelModule, TabMenuModule, MenubarModule, DropdownModule, DataTableModule, FieldsetModule, GrowlModule, AutoCompleteModule, CalendarModule, FileUploadModule, TranslateModule, CheckboxModule, TableModule, ConfirmDialogModule
  ],
  declarations: [LayoutComponent, AppTabMenusComponent, BasePageComponent, BasePageToolbarComponent, SearchInputComponent, AppAmountInput, AppAutocomplete, AppDateInput, AppComboBox, RequiredDirective, AppRateInput
  ],
  exports:[LayoutComponent, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, LoadingModule, BasePageToolbarComponent, TabViewModule, InputTextModule, DropdownModule, SearchInputComponent, AppAmountInput, DataTableModule, FieldsetModule, GrowlModule, AutoCompleteModule, AppAutocomplete, CalendarModule, AppDateInput, AppComboBox, FileUploadModule, RequiredDirective, AppRateInput, TranslateModule, CheckboxModule, TableModule, ConfirmDialogModule]
})
export class CommonsModule { }
