import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = "Prueba Técnica de Programación";
  public base: string = environment.base;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log("Mostrando la lista de usuarios e Insertando un usuario:")
    this.getUsers();
    this.registerUser();
  }

  getUsers(): void {
    this.http.get(this.base + "users?page=2").subscribe((user: any) => {
      console.log(user.data)
    })
  }

  registerUser() {
    const aux = new FormData();
    aux.set("name", "Susana")
    aux.set("job", "developer")

    this.http.post(this.base + "users", aux).subscribe(
      resp => {
        console.log(resp);
      });
  }

  // Desinfectar enlaces con DOMSanitizer
  public sanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base)
  }
}
