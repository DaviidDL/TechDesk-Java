package com.techdesk.dao;

import com.techdesk.config.ConexionBD;
import com.techdesk.modelo.Ticket;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TicketDAO {

    // INSERTAR TICKET
    public boolean crearTicket(Ticket ticket) {

        String sql = "INSERT INTO tickets " +
                "(id_usuario, id_tecnico, id_categoria, id_prioridad, id_estado, titulo, descripcion) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conexion = ConexionBD.conectar();
             PreparedStatement sentencia = conexion.prepareStatement(sql)) {

            sentencia.setInt(1, ticket.getIdUsuario());
            sentencia.setInt(2, ticket.getIdTecnico());
            sentencia.setInt(3, ticket.getIdCategoria());
            sentencia.setInt(4, ticket.getIdPrioridad());
            sentencia.setInt(5, ticket.getIdEstado());
            sentencia.setString(6, ticket.getTitulo());
            sentencia.setString(7, ticket.getDescripcion());

            sentencia.executeUpdate();

            System.out.println("Ticket creado correctamente.");
            return true;

        } catch (SQLException e) {
            System.out.println("Error al crear el ticket: " + e.getMessage());
            return false;
        }
    }


    // CONSULTAR TICKETS
    public void consultarTickets() {

        String sql = "SELECT * FROM tickets";

        try (Connection conexion = ConexionBD.conectar();
             PreparedStatement sentencia = conexion.prepareStatement(sql);
             ResultSet resultado = sentencia.executeQuery()) {

            System.out.println("\n--- LISTA DE TICKETS ---");

            while (resultado.next()) {

                System.out.println("ID: " + resultado.getInt("id_ticket"));
                System.out.println("Título: " + resultado.getString("titulo"));
                System.out.println("Descripción: " + resultado.getString("descripcion"));
                System.out.println("Usuario: " + resultado.getInt("id_usuario"));
                System.out.println("Técnico: " + resultado.getInt("id_tecnico"));
                System.out.println("------------------------");
            }

        } catch (SQLException e) {
            System.out.println("Error al consultar tickets: " + e.getMessage());
        }
    }


    // ACTUALIZAR TICKET    
    public boolean actualizarTicket(Ticket ticket) {

    String sql = "UPDATE tickets SET " +
            "titulo = ?, descripcion = ?, id_prioridad = ?, id_estado = ? " +
            "WHERE id_ticket = ?";

    try (Connection conexion = ConexionBD.conectar()) {

        if (conexion == null) {
            System.out.println("No hay conexión con la base de datos.");
            return false;
        }

        try (PreparedStatement sentencia = conexion.prepareStatement(sql)) {

            sentencia.setString(1, ticket.getTitulo());
            sentencia.setString(2, ticket.getDescripcion());
            sentencia.setInt(3, ticket.getIdPrioridad());
            sentencia.setInt(4, ticket.getIdEstado());
            sentencia.setInt(5, ticket.getIdTicket());

            int filasActualizadas = sentencia.executeUpdate();

            if (filasActualizadas > 0) {
                System.out.println("Ticket actualizado correctamente.");
                return true;
            } else {
                System.out.println("No existe un ticket con ese ID.");
                return false;
            }
        }

    } catch (SQLException e) {
        System.out.println("Error al actualizar el ticket: " + e.getMessage());
        return false;
    }
}


    // ELIMINAR TICKET
public boolean eliminarTicket(int idTicket) {

    String sql = "DELETE FROM tickets WHERE id_ticket = ?";

    try (Connection conexion = ConexionBD.conectar()) {

        if (conexion == null) {
            System.out.println("No hay conexión con la base de datos.");
            return false;
        }

        try (PreparedStatement sentencia = conexion.prepareStatement(sql)) {

            sentencia.setInt(1, idTicket);

            int filasEliminadas = sentencia.executeUpdate();

            if (filasEliminadas > 0) {
                System.out.println("Ticket eliminado correctamente.");
                return true;
            } else {
                System.out.println("No existe un ticket con ese ID.");
                return false;
            }
        }

    } catch (SQLException e) {
        System.out.println("Error al eliminar el ticket: " + e.getMessage());
        return false;
    }
}
}