
package com.techdesk;

import com.techdesk.dao.TicketDAO;
import com.techdesk.modelo.Ticket;

import java.util.Scanner;

public class App {

    private static final Scanner teclado = new Scanner(System.in);
    private static final TicketDAO ticketDAO = new TicketDAO();

    public static void main(String[] args) {

        int opcion;

        do {
            System.out.println("\n==============================");
            System.out.println("       TECHDESK - TICKETS");
            System.out.println("==============================");
            System.out.println("1. Crear ticket");
            System.out.println("2. Consultar tickets");
            System.out.println("3. Actualizar ticket");
            System.out.println("4. Eliminar ticket");
            System.out.println("5. Salir");
            System.out.println("==============================");

            opcion = leerEntero("Selecciona una opción: ");

            switch (opcion) {
                case 1:
                    crearTicket();
                    break;

                case 2:
                    ticketDAO.consultarTickets();
                    break;

                case 3:
                    actualizarTicket();
                    break;

                case 4:
                    eliminarTicket();
                    break;

                case 5:
                    System.out.println("Gracias por utilizar TechDesk.");
                    break;

                default:
                    System.out.println("Opción inválida. Selecciona del 1 al 5.");
            }

        } while (opcion != 5);

        teclado.close();
    }

    private static void crearTicket() {

        System.out.println("\n--- CREAR TICKET ---");

        int idUsuario = leerEntero("ID del usuario solicitante: ");
        int idTecnico = leerEntero("ID del técnico asignado: ");
        int idCategoria = leerEntero("ID de la categoría: ");
        int idPrioridad = leerEntero("ID de la prioridad: ");
        int idEstado = leerEntero("ID del estado: ");

        String titulo = leerTexto("Título del problema: ");
        String descripcion = leerTexto("Descripción del problema: ");

        Ticket ticket = new Ticket(
                idUsuario,
                idTecnico,
                idCategoria,
                idPrioridad,
                idEstado,
                titulo,
                descripcion
        );

        ticketDAO.crearTicket(ticket);
    }

    private static void actualizarTicket() {

        System.out.println("\n--- ACTUALIZAR TICKET ---");

        int idTicket = leerEntero("ID del ticket que deseas actualizar: ");
        String titulo = leerTexto("Nuevo título: ");
        String descripcion = leerTexto("Nueva descripción: ");
        int idPrioridad = leerEntero("Nuevo ID de prioridad: ");
        int idEstado = leerEntero("Nuevo ID de estado: ");

        Ticket ticket = new Ticket();

        ticket.setIdTicket(idTicket);
        ticket.setTitulo(titulo);
        ticket.setDescripcion(descripcion);
        ticket.setIdPrioridad(idPrioridad);
        ticket.setIdEstado(idEstado);

        ticketDAO.actualizarTicket(ticket);
    }

    private static void eliminarTicket() {

        System.out.println("\n--- ELIMINAR TICKET ---");

        int idTicket = leerEntero("ID del ticket que deseas eliminar: ");

        System.out.print("¿Confirmas la eliminación? (S/N): ");
        String confirmacion = teclado.nextLine().trim();

        if (confirmacion.equalsIgnoreCase("S")) {
            ticketDAO.eliminarTicket(idTicket);
        } else {
            System.out.println("Operación cancelada.");
        }
    }

    private static int leerEntero(String mensaje) {

        while (true) {
            System.out.print(mensaje);
            String entrada = teclado.nextLine().trim();

            try {
                int numero = Integer.parseInt(entrada);

                if (numero <= 0) {
                    System.out.println("Ingresa un número mayor que cero.");
                    continue;
                }

                return numero;

            } catch (NumberFormatException e) {
                System.out.println("Dato inválido. Ingresa un número entero.");
            }
        }
    }


private static String leerTexto(String mensaje) {

    while (true) {
        System.out.print(mensaje);
        String texto = teclado.nextLine().trim();

        if (texto.isEmpty()) {
            System.out.println("Este campo no puede quedar vacío.");
        } else if (mensaje.toLowerCase().contains("título")
                && texto.length() > 100) {
            System.out.println(
                "El título no puede superar los 100 caracteres."
            );
        } else if (mensaje.toLowerCase().contains("descripción")
                && texto.length() > 2000) {
            System.out.println(
                "La descripción no puede superar los 2000 caracteres."
            );
        } else {
            return texto;
        }
    }
}

}

