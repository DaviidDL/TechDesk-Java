package com.techdesk.modelo;

public class Ticket {

    private int idTicket;
    private int idUsuario;
    private int idTecnico;
    private int idCategoria;
    private int idPrioridad;
    private int idEstado;
    private String titulo;
    private String descripcion;

    public Ticket() {
    }

    public Ticket(int idUsuario, int idTecnico, int idCategoria,
                  int idPrioridad, int idEstado,
                  String titulo, String descripcion) {

        this.idUsuario = idUsuario;
        this.idTecnico = idTecnico;
        this.idCategoria = idCategoria;
        this.idPrioridad = idPrioridad;
        this.idEstado = idEstado;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

    public int getIdTicket() {
        return idTicket;
    }

    public void setIdTicket(int idTicket) {
        this.idTicket = idTicket;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public int getIdTecnico() {
        return idTecnico;
    }

    public void setIdTecnico(int idTecnico) {
        this.idTecnico = idTecnico;
    }

    public int getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(int idCategoria) {
        this.idCategoria = idCategoria;
    }

    public int getIdPrioridad() {
        return idPrioridad;
    }

    public void setIdPrioridad(int idPrioridad) {
        this.idPrioridad = idPrioridad;
    }

    public int getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(int idEstado) {
        this.idEstado = idEstado;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}