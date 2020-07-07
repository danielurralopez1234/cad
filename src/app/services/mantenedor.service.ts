import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Aceite } from '../models/aceite';
import { FormaPago } from '../models/formaPago';
import { Servicio } from '../models/servicio';
import { Auto } from '../models/auto';
import { Usuario } from '../models/usuario';
import { storage } from 'firebase';
import { TipoCombustible } from '../models/tipoCombustible';
import {TipoMantencion} from '../models/tipoMantencion';
import {MisAutos} from '../models/misAutos';
import {AgendaMecanico} from '../models/agendaMecanico';
import {Reserva} from '../models/reserva';
import {Horario} from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class MantenedorService {
  storageRef: any;
  aceite: any;
  formaPago: any;
  servicio: any;
  auto: any;
  usuario: any;
  misAutos: any;
  agenda: any;
  reserva: any;


  constructor(private afDB: AngularFireDatabase) {
    this.storageRef = afDB.database.ref();
    this.aceite = afDB.database.ref('aceite');
    this.auto = afDB.database.ref('auto');
    this.usuario = afDB.database.ref('usuario');
    this.misAutos = afDB.database.ref('misAutos');
    this.agenda = afDB.database.ref('agendaMecanico');
    this.reserva = afDB.database.ref('reserva');
  }

  async saveAceite(aceite: Aceite) {
    return new Promise((resolve, reject) => {
      this.aceite.push(aceite).then(res => {
        resolve(res.getKey());
      }).catch(err => reject(err));
    });
  }
  getAllAceite() {
    return this.afDB.list('aceite');
  }
  getAllMisAutos() {
    return this.afDB.list('misAutos');
  }

  getAllTipoCombustible() {
    return this.afDB.list('tipoCombustible');
  }
  getAllTipoMantencion() {
    return this.afDB.list('tipoMantencion');
  }

  async updateAceite(id: string, est: boolean) {
    this.afDB.database.ref('aceite/' + id).update({ estado: est });
  }
  async updateAceiteFoto(id: string, img: string) {
    this.afDB.database.ref('aceite/' + id).update({ foto: img });
  }
  async updateAceitePop(id: string, aceite: Aceite) {
    this.afDB.database.ref('aceite/' + id).update({
      tipoCom: aceite.tipoCom,
      nombre: aceite.nombre,
      descripcion: aceite.descripcion,
      valor: aceite.valor
    });
  }
  async updateMisAutosPop(id: string, misautos: MisAutos) {
    this.afDB.database.ref('misAutos/' + id).update({
      marca: misautos.marca,
      modelo: misautos.modelo,
      anio: misautos.anio,
      cilindrada: misautos.cilindrada
    });
  }
  async deleteAceite(id: string) {
    this.afDB.object('aceite/' + id).remove();
  }
  async deleteMisAutos(id: string) {
    this.afDB.object('misAutos/' + id).remove();
  }
  async saveFormaPago(formaPago: FormaPago) {
    this.afDB.database.ref('formaPago').push().set(formaPago);
  }
  async deleteFormaPago(id: string) {
    this.afDB.object('formaPago/' + id).remove();
  }
  async updateFormaPago(id: string, est: boolean) {
    this.afDB.database.ref('formaPago/' + id).update({ estado: est });
  }
  async updateFormaPagoPop(id: string, formaPago: FormaPago) {
    this.afDB.database.ref('formaPago/' + id).update({
      nombre: formaPago.nombre,
      comentario: formaPago.comentario
    });
  }
  getAllformaPago() {
    return this.afDB.list('formaPago');
  }
  getAllMarca() {
    return this.afDB.list('marca');
  }
  getAllTipoServicio() {
    return this.afDB.list('servicio');
  }
  getAllHorario() {
    return this.afDB.list('horario');
  }
  getModeloByMarca(id: number) {
    return this.afDB.database.ref('modelo').
    orderByChild('marca').equalTo(id);
  }
  getComunaByRegion(id: number) {
    return this.afDB.database.ref('comuna').
    orderByChild('region').equalTo(id);
  }
  getComunaById(id: number) {
    return this.afDB.database.ref('comuna').
    orderByChild('id').equalTo(id).once('child_added');
  }
  getRegionById(id: number) {
    return this.afDB.database.ref('region').
    orderByChild('id').equalTo(id).once('child_added');
  }
  getMantencionByServicio(id: string) {
    return this.afDB.database.ref('tipoMantencion').
    orderByChild('tipoServicio').equalTo(id);
  }
  getMecanicoByRolSector(id: number) {
    return this.afDB.database.ref('usuario').
    orderByChild('rol').equalTo(id);
  }
  getReservaByUid(uid: string) {
    return this.afDB.database.ref('reserva').
    orderByChild('idUsuario').equalTo(uid);
  }
  getReservaByIdAgenda(id: string) {
    return this.afDB.database.ref('reserva').
    orderByChild('idAgenda').equalTo(id);
  }
  getAceiteByTipoCom(idCom: string) {
    return this.afDB.database.ref('aceite').
    orderByChild('tipoCom').equalTo(idCom);
  }
  getMisAutosByIdUsuario(id: string) {
    return this.afDB.database.ref('misAutos').
    orderByChild('idUsuario').equalTo(id);
  }
  async saveServicio(servicio: Servicio) {
    this.afDB.database.ref('servicio/').push().set(servicio);
  }
  async saveTipoMantencion(mantencion: TipoMantencion) {
    this.afDB.database.ref('tipoMantencion/').push().set(mantencion);
  }
  async updateServicio(id: string, est: boolean) {
    this.afDB.database.ref('servicio/' + id).update({ estado: est });
  }
  async deleteServicio(id: string) {
    this.afDB.object('servicio/' + id).remove();
  }
  async updateServicioPop(id: string, servicio: Servicio) {
    this.afDB.database.ref('servicio/' + id).update({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      valor: servicio.valor
    });
  }
  getAllservicio() {
    return this.afDB.list('servicio');
  }
  getServicioByUid(uid: string) {
    return this.afDB.list('servicio/' + uid);
  }
  getAgendaById(uid: string) {
    return this.afDB.database.ref('agendaMecanico/' + uid);
  }
  getAgendaByIdMecanico(id: string) {
    return this.afDB.database.ref('agendaMecanico').
    orderByChild('idMecanico').equalTo(id);
  }
  async updateAgenda(id: string, est: number) {
    this.afDB.database.ref('agendaMecanico/' + id).update({ estado: est });
  }
  async saveAuto(auto: Auto) {
    return new Promise((resolve, reject) => {
      this.auto.push(auto).then(res => {
        resolve(res.getKey());
      }).catch(err => reject(err));
    });
  }
  async updateAuto(id: string, est: boolean) {
    this.afDB.database.ref('auto/' + id).update({ estado: est });
  }
  async deleteAuto(id: string) {
    this.afDB.object('auto/' + id).remove();
  }
  async updateAutoPop(id: string, auto: Auto) {
    this.afDB.database.ref('auto/' + id).update({
      anio: auto.anio,
      marca: auto.marca,
      modelo: auto.modelo,
      combustible: auto.combustible,
      patente: auto.patente
    });
  }
  async updateUsuarioPop(id: string, usuario: Usuario) {
    this.afDB.database.ref('usuario/' + id).update({
      rut: usuario.rut,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fechaNacimiento: usuario.fechaNacimiento,
      email: usuario.email,
      telefono: usuario.telefono,
      region: usuario.region,
      comuna: usuario.comuna
    });
  }
  getAllauto() {
    return this.afDB.list('auto');
  }
  async saveMecanico(usuario: Usuario) {
    usuario.rol = 2;
    this.usuario.push().set(usuario);
  }
  async saveUsuario(usuario: Usuario) {
    return new Promise((resolve, reject) => {
      this.usuario.push(usuario).then(res => {
        resolve(res.getKey());
      }).catch(err => reject(err));
    });
  }
  async updateUsuarioFoto(id: string, img: string) {
    this.afDB.database.ref('usuario/' + id).update({ foto: img });
  }
  async deleteUsuario(id: string) {
    this.afDB.object('usuario/' + id).remove();
  }
  async updateUsuario(id: string, est: boolean) {
    this.afDB.database.ref('usuario/' + id).update({ estado: est });
  }

  getAllregion() {
    return this.afDB.list('region');
  }

  getAllcomuna() {
    return this.afDB.list('comuna');
  }

  getAllarea() {
    return this.afDB.list('sector');
  }

  async saveMisAutos(autos: MisAutos) {
    return new Promise((resolve, reject) => {
      this.misAutos.push(autos).then(res => {
        resolve(res.getKey());
      }).catch(err => reject(err));
    });
  }

  getMisAutosById(id: string) {
    return this.afDB.object('misAutos/' + id).valueChanges();
  }
  getMisautosByPatente(patente: string) {
    return this.afDB.database.ref('misAutos').
    orderByChild('patente').equalTo(patente).once('child_added');
  }
  getModeloById(id: string) {
    return this.afDB.object('modelo/' + id).valueChanges();
  }
  getMarcaById(id: string) {
    return this.afDB.object('marca/' + id).valueChanges();
  }

  saveAgenda(agenda: AgendaMecanico) {
    return new Promise((resolve, reject) => {
      this.agenda.push(agenda).then(res => {
        resolve(res.getKey());
      }).catch(err => reject(err));
    });
  }

  saveReserva(reserva: Reserva) {
    return new Promise((resolve, reject) => {
      this.reserva.push(reserva).then(res => {
        resolve(res.getKey());
      }).catch(err => reject(err));
    });
  }

  async upLoadImage(img: any, id: string) {
    this.storageRef = storage().ref('img/' + id);
    return new Promise((resolve, reject) => {
      this.storageRef.put(img).then(res => {
        res.ref.getDownloadURL().then(resp => {
          resolve(resp);
        });
      }).catch(err => reject(err));
    });
  }

  removeImage(id: string) {
    storage().ref('img/' + id).delete();
  }

  saveTipoCombustible(tipo: TipoCombustible) {
    this.afDB.database.ref('tipoCombustible').push(tipo);
  }
  saveHorario(horario: Horario) {
    this.afDB.database.ref('horario').push(horario);
  }

}
