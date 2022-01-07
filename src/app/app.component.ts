import { Component } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'pruebaTecnica';
  public base: string = environment.base;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getPost();
    // console.log(this.comentarios)
  }

  // Obtener todos los post en un array
  getPost(): void {
    this.http.get(this.base + "posts").subscribe((post: any) => {
      this.publicacion = post;
      // this.publicacion[0]["comments"] = this.getComments(post["id_post"]);
      // console.log(this.publicacion[0]["id_post"]);
    })
  }

  // Desinfectar enlaces con DOMSanitizer
  public sanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
