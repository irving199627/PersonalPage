import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  titulo;
  subtitulo;
  url;
  descripcion;
  tipo;
  itemsRef: AngularFireList<any>;
  item: Observable<any>;
  img: any = '';
  imagenSubir: File;
  uploadProgress: Observable<number>;
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage) {
    this.itemsRef = this.db.list('proyectos');
  }

  addProyecto( titulo, subtitulo, descripcion, imagen, urlProyecto) {
    const id = this.db.database.ref().child('proyectos').push().key;
    this.itemsRef.update(id, {
      titulo, subtitulo, descripcion, imagen, id, urlProyecto, tipo: this.tipo
    })
  }

  getProyecto() {
    return this.itemsRef.valueChanges()
    .pipe(map((proyectos: any) => {
      console.log(proyectos);
    }));
  }

  subirImagen() {
    const fecha = new Date();
    console.log(this.tipo);
    const filePath = `proyectos/${ this.titulo }-${ fecha.getMilliseconds() }`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(this.imagenSubir);

    this.uploadProgress = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          let urlImg = '';
          ref.getDownloadURL().subscribe(img => {
              urlImg = img;
              this.addProyecto(this.titulo, this.subtitulo, this.descripcion, urlImg, this.url)
              console.log(urlImg);
          });
        })
      ).subscribe();
  }

  uploadFile(evento) {
    const esImagen = evento.target.files[0].type;
    if (esImagen.startsWith('image')) {
      this.imagenSubir = evento.target.files[0];
      const reader = new FileReader();
      const urlImagenTemp = reader.readAsDataURL(evento.target.files[0]);
      reader.onloadend = () => this.img = reader.result.toString();
    }
  }
}
