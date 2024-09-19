import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { OtrosProductos, Lonas, Viniles, Displays, Laminas, Telas, CotizacionIndex } from "./products-catalog.model";
import { Cotizacion } from "./products-catalog.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DataBaseRepositoryService {
  constructor(private httpClient: HttpClient) { }

  addCotizacion(cotizacion: Cotizacion): Observable<Cotizacion> {
    return this.httpClient.post<Cotizacion>('https://cim-cotizador-default-rtdb.firebaseio.com/cotizaciones.json', cotizacion);
  }

  deleteCotizacion(id: string): Observable<Cotizacion> {
    return this.httpClient.delete<Cotizacion>(`https://cim-cotizador-default-rtdb.firebaseio.com/cotizaciones/${id}.json`);
  }

  updateCotizacion(cotizacion: Cotizacion): Observable<Cotizacion> {
    return this.httpClient.put<Cotizacion>(`https://cim-cotizador-default-rtdb.firebaseio.com/cotizaciones/${cotizacion.id}.json`, cotizacion);
  }

  getCotizacionByNumero(numero: number): Observable<Cotizacion[]> {
    return this.httpClient.get<Cotizacion[]>(`https://cim-cotizador-default-rtdb.firebaseio.com/cotizaciones.json?orderBy="numero"&equalTo=${numero}`)
    .pipe(
      map((data) => {
        const cotizaciones: Cotizacion[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            cotizaciones.push({ ...data[key], id: key });
          }
        }
        return cotizaciones;
        })
    );
  }

  getCotizaciones() : Observable<Cotizacion[]> {
    return this.httpClient.get<Cotizacion[]>('https://cim-cotizador-default-rtdb.firebaseio.com/cotizaciones.json')
      .pipe(
        map((data) => {
            const cotizaciones: Cotizacion[] = [];
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                cotizaciones.push({ ...data[key], id: key });
              }
            }
            return cotizaciones;
            })
        );
      }

   getUltimoNumeroCotizacion() : Observable<CotizacionIndex> {
   return this.httpClient.get<CotizacionIndex>('https://cim-cotizador-default-rtdb.firebaseio.com/cotizaciones-index.json');
  }

  updateUltimoNumeroCotizacion(numero: number): Observable<any> {
    return this.httpClient.put('https://cim-cotizador-default-rtdb.firebaseio.com/cotizaciones-index/ultimoNumero.json', numero);
  }

  updateOtrosProductos(otrosProductos: OtrosProductos): Observable<OtrosProductos> {
    return this.httpClient.put<OtrosProductos>(`https://cim-cotizador-default-rtdb.firebaseio.com/otros-productos/${otrosProductos.id}.json`, otrosProductos);
  }

  addOtrosProductos(otrosProductos: OtrosProductos): Observable<OtrosProductos> {
    return this.httpClient.post<OtrosProductos>('https://cim-cotizador-default-rtdb.firebaseio.com/otros-productos.json', otrosProductos);
  }

  deleteOtrosProductos(id: string): Observable<OtrosProductos> {
    return this.httpClient.delete<OtrosProductos>(`https://cim-cotizador-default-rtdb.firebaseio.com/otros-productos/${id}.json`);
}

getOtrosProductos() : Observable<OtrosProductos[]> {
  return this.httpClient.get<OtrosProductos[]>('https://cim-cotizador-default-rtdb.firebaseio.com/otros-productos.json')
    .pipe(
      map((data) => {
          const otrosProductos: OtrosProductos[] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              otrosProductos.push({ ...data[key], id: key });
            }
          }
          return otrosProductos;
          })
      );
}

  

    updateLonas(lonas: Lonas): Observable<Lonas> {
      return this.httpClient.put<Lonas>(`https://cim-cotizador-default-rtdb.firebaseio.com/lonas/${lonas.id}.json`, lonas);
    }

    addLonas(lonas: Lonas): Observable<Lonas> {
      return this.httpClient.post<Lonas>('https://cim-cotizador-default-rtdb.firebaseio.com/lonas.json', lonas);
    }

    deleteLonas(id: string): Observable<Lonas> {
      return this.httpClient.delete<Lonas>(`https://cim-cotizador-default-rtdb.firebaseio.com/lonas/${id}.json`);
    }

    getLonas() : Observable<Lonas[]> {
      return this.httpClient.get<Lonas[]>('https://cim-cotizador-default-rtdb.firebaseio.com/lonas.json')
        .pipe(
          map((data) => {
              const lonas: Lonas[] = [];
              for (const key in data) {
                if (data.hasOwnProperty(key)) {
                  lonas.push({ ...data[key], id: key });
                }
              }
              return lonas;
              })
          );
      }

      

      updateViniles(viniles: Viniles): Observable<Viniles> {
        return this.httpClient.put<Viniles>(`https://cim-cotizador-default-rtdb.firebaseio.com/viniles/${viniles.id}.json`, viniles);
      }

      addViniles(viniles: Viniles): Observable<Viniles> {
        return this.httpClient.post<Viniles>('https://cim-cotizador-default-rtdb.firebaseio.com/viniles.json', viniles);
      }

      deleteViniles(id: string): Observable<Viniles> {
        return this.httpClient.delete<Viniles>(`https://cim-cotizador-default-rtdb.firebaseio.com/viniles/${id}.json`);
      }

      getViniles() : Observable<Viniles[]> {
        return this.httpClient.get<Viniles[]>('https://cim-cotizador-default-rtdb.firebaseio.com/viniles.json')
          .pipe(
            map((data) => {
                const viniles: Viniles[] = [];
                for (const key in data) {
                  if (data.hasOwnProperty(key)) {
                    viniles.push({ ...data[key], id: key });
                  }
                }
                return viniles;
                })
            );
        }

        updateDisplays(displays: Displays): Observable<Displays> {
          return this.httpClient.put<Displays>(`https://cim-cotizador-default-rtdb.firebaseio.com/displays/${displays.id}.json`, displays);
        }

        addDisplays(displays: Displays): Observable<Displays> {
          return this.httpClient.post<Displays>('https://cim-cotizador-default-rtdb.firebaseio.com/displays.json', displays);
        }

        deleteDisplays(id: string): Observable<Displays> {
          return this.httpClient.delete<Displays>(`https://cim-cotizador-default-rtdb.firebaseio.com/displays/${id}.json`);
        }

        getDisplays() : Observable<Displays[]> {
          return this.httpClient.get<Displays[]>('https://cim-cotizador-default-rtdb.firebaseio.com/displays.json')
            .pipe(
              map((data) => {
                  const displays: Displays[] = [];
                  for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                      displays.push({ ...data[key], id: key });
                    }
                  }
                  return displays;
                  })
              );
          }

          updateLaminas(laminas: Laminas): Observable<Laminas> {
            return this.httpClient.put<Laminas>(`https://cim-cotizador-default-rtdb.firebaseio.com/laminas/${laminas.id}.json`, laminas);
          }

          addLaminas(laminas: Laminas): Observable<Laminas> {
            return this.httpClient.post<Laminas>('https://cim-cotizador-default-rtdb.firebaseio.com/laminas.json', laminas);
          }

          deleteLaminas(id: string): Observable<Laminas> {
            return this.httpClient.delete<Laminas>(`https://cim-cotizador-default-rtdb.firebaseio.com/laminas/${id}.json`);
          }

          getLaminas() : Observable<Laminas[]> {
            return this.httpClient.get<Laminas[]>('https://cim-cotizador-default-rtdb.firebaseio.com/laminas.json')
              .pipe(
                map((data) => {
                    const laminas: Laminas[] = [];
                    for (const key in data) {
                      if (data.hasOwnProperty(key)) {
                        laminas.push({ ...data[key], id: key });
                      }
                    }
                    return laminas;
                    })
                );
            }

            getTelas() : Observable<Telas[]> {
              return this.httpClient.get<Telas[]>('https://cim-cotizador-default-rtdb.firebaseio.com/telas.json')
                .pipe(
                  map((data) => {
                      const telas: Telas[] = [];
                      for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                          telas.push({ ...data[key], id: key });
                        }
                      }
                      return telas;
                      })
                  );
              }

              updateTelas(telas: Telas): Observable<Telas> {
                return this.httpClient.put<Telas>(`https://cim-cotizador-default-rtdb.firebaseio.com/telas/${telas.id}.json`, telas);
              }
    
              addTelas(telas: Telas): Observable<Telas> {
                return this.httpClient.post<Telas>('https://cim-cotizador-default-rtdb.firebaseio.com/telas.json', telas);
              }
    
              deleteTelas(id: string): Observable<Telas> {
                return this.httpClient.delete<Telas>(`https://cim-cotizador-default-rtdb.firebaseio.com/telas/${id}.json`);
              }
}