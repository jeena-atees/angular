import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from "./search-filter.pipe";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    FormsModule,
    SearchFilterPipe
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-courses-project';
  searchText: string = '';
  searchTerm: string = '';
  
  filteredItems: any = [];
 readonly APIUrl ='http://localhost:5038/api/courses/';
 
  constructor(private http:HttpClient){
    
  }
   
   courses:any = [];
   categories:any = [];
   refreshCategories(){
    this.http.get(this.APIUrl+'GetCategories').subscribe(category=>{
      this.categories = category;
      console.log(category);
    })
  }
  refreshCourses(){
    this.http.get(this.APIUrl+'GetCourses').subscribe(data=>{
      this.courses = data;
    })
  }
  
  ngOnInit(){
    this.refreshCategories();
    this.refreshCourses();
    
  }
  search(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();
  }

  filterItems(searchTerm: string) {
    this.filteredItems = this.courses.filter((item:any) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
