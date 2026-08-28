import { computed, inject, Injectable, signal } from '@angular/core';
import { Tarjeta } from '../models/tarjeta.model';
import { Servicio } from '../models/servicio.model';
import { Cuota } from '../models/cuota.model';
import { EmpresaApi } from './empresa-api/empresa-api';
import { Empresa } from '../models/empresa.model';
import { TarjetaApi } from './tarjeta-api/tarjeta-api';
import { ServicioApi } from './servicio-api/servicio-api';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  empresaApi = inject(EmpresaApi);
  empresa = signal<Empresa[]>([]);
  tarjetaApi = inject(TarjetaApi);
  tarjeta = signal<Tarjeta[]>([]);
  servicioApi = inject(ServicioApi)
  servicio = signal<Servicio[]>([]);
  modalAbierto = signal<string | null>(null);
  tarjetaSeleccionada = signal<string | null>(null);
  tarjetaEditando = signal<Tarjeta | null>(null);
  servicioEditando = signal<Servicio | null>(null);
  cuota = signal<string | null>(null);

  constructor() {
    this.loadData();
  }

  public abrirModal(
    tipo: string,
    id?: string,
    tarjeta?: Tarjeta,
    cuota?: string,
    servicio?: Servicio,
  ) {
    this.modalAbierto.set(tipo);
    this.tarjetaSeleccionada.set(id ?? null);
    this.tarjetaEditando.set(tarjeta ?? null);
    this.cuota.set(cuota ?? null);
    this.servicioEditando.set(servicio ?? null);
  }

  public cerrarModal() {
    this.modalAbierto.set(null);
  }

  private loadData() {
    this.tarjetaApi.getAll().subscribe({
      next: (req) => {
        this.tarjeta.set(req);
      },
    });
    this.empresaApi.getAll().subscribe({
      next: (req) => {
        this.empresa.set(req);
      },
    });
    this.servicioApi.getAll().subscribe({
      next: (req) => {
        this.servicio.set(req);
      },
    });
  }

  private saveData() { //ELIMINAR ----------------------------------------------------------------------
    localStorage.setItem('tarjetas', JSON.stringify(this.tarjeta()));
    localStorage.setItem('servicios', JSON.stringify(this.servicio()));
  }

  public agregarTarjeta(data: {nombre: string, monto: number, vencimiento: string, empresaId: string}) {
    this.tarjetaApi.create(data).subscribe({
      next: (req) => {
        const tarjetaCompleta = {...req, cuotas:[]}
        const tarjetas = this.tarjeta()
        this.tarjeta.set([...tarjetas, tarjetaCompleta])
      }
    })
  }

  public editarTarjeta(id: string, data: {nombre: string, monto: number, vencimiento: string, empresaId: string}) {
    this.tarjetaApi.update(id, data).subscribe({
      next: (req) => {
        const tarjetas = this.tarjeta()
        const newTarjetas = tarjetas.map((t) => (t.id === id ? req : t));
        this.tarjeta.set(newTarjetas)
      }
    })
  }

  public eliminarTarjeta(id: string) {
    this.tarjetaApi.delete(id).subscribe({
      next: (req) => {
        const tarjetas = this.tarjeta();
        const newTarjetas = tarjetas.filter((t) => t.id !== id);
        this.tarjeta.set(newTarjetas);
      }
    })
    
  }

  public agregarServicio(data: {nombre: string, empresaId: string, monto: number, vencimiento: string}) {
    this.servicioApi.create(data).subscribe({
      next: (req) => {
        const servicios = this.servicio();
        this.servicio.set([...servicios, req]);
      }
    })
  }

  public editarServicio(id: string, data: {nombre: string, empresaId: string, monto: number, vencimiento: string}) {
    this.servicioApi.update(id, data).subscribe({
      next: (req) => {
        const servicios = this.servicio();
        const newServicios = servicios.map((s) => s.id === req.id ? req : s);
        this.servicio.set(newServicios);
      }
    })
  }

  public eliminarServicio(id: string) {
    this.servicioApi.delete(id).subscribe({
      next: (req) => {
        const servicios = this.servicio();
        const newServicios = servicios.filter((s) => s.id !== id)
        this.servicio.set(newServicios)
      }
    })
  }

  public agregarCuota(tarjetaId: string, cuota: Cuota) {
    const dataTarjeta = this.tarjeta();
    const cuotasTarjeta = dataTarjeta.map((t) =>
      t.id === tarjetaId ? { ...t, cuotas: [...t.cuotas, cuota] } : t,
    );
    this.tarjeta.set(cuotasTarjeta);
    this.saveData();
  }

  public editarCuota(tarjeta: Tarjeta, cuota: Cuota) {
    const dataTarjeta = this.tarjeta();
    const cuotasTarjeta = dataTarjeta.map((t) =>
      t.id === tarjeta.id
        ? { ...t, cuotas: t.cuotas.map((c) => (c.id === cuota.id ? cuota : c)) }
        : t,
    );
    this.tarjeta.set(cuotasTarjeta);
    this.saveData();
  }

  public eliminarCuota(tarjetaId: string, cuotaId: string) {
    const dataTarjeta = this.tarjeta();
    const newCuotas = dataTarjeta.map((t) =>
      t.id === tarjetaId ? { ...t, cuotas: t.cuotas.filter((c) => c.id !== cuotaId) } : t,
    );
    this.tarjeta.set(newCuotas);
    this.saveData();
  }

  public totalTarjetas = computed(() => this.tarjeta().reduce((sum, t) => sum + t.monto, 0));

  public totalServicios = computed(() => this.servicio().reduce((sum, s) => sum + s.monto, 0));

  public totalMensual = computed(() => this.totalTarjetas() + this.totalServicios());

  public actualizarCuotas() {
    const tarjetasActualizadas = this.tarjeta().map((t) => ({
      ...t,
      cuotas: t.cuotas.map((c) => {
        const hoy = new Date();
        const inicio = new Date(c.fechaCarga);
        const meses =
          (hoy.getFullYear() - inicio.getFullYear()) * 12 + (hoy.getMonth() - inicio.getMonth());
        const nuevaCuotaActual = (c.cuotaBase || c.cuotaActual) + meses;
        return {
          ...c,
          cuotaActual: Math.min(nuevaCuotaActual, c.cuotaTotal),
        };
      }),
    }));
    this.tarjeta.set(tarjetasActualizadas);
    this.saveData();
  }

  ProximosVtos = computed(() => {
    const hoy = new Date();
    const tarjetas = this.tarjeta().map((t) => ({
      nombre: t.nombre,
      monto: t.monto,
      fecha: new Date(t.vencimiento + 'T00:00:00'),
      tipo: 'tarjeta',
    }));
    const servicios = this.servicio().map((s) => ({
      nombre: s.nombre,
      monto: s.monto,
      fecha: new Date(s.vencimiento + 'T00:00:00'),
      tipo: 'servicio',
    }));
    return [...tarjetas, ...servicios]
      .filter((item) => item.fecha > hoy)
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
      .slice(0, 5);
  });
}
