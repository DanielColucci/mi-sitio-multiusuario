import java.util.List;

/** Ejecuta las consultas de AT y HM sobre la misma lista y muestra los resultados. */
public class Main {
    static void imprimir(String titulo, List<Candidato> filas) {
        System.out.println("\n> " + titulo + " (" + filas.size() + " filas)");
        filas.forEach(c -> System.out.println("  " + c));
    }
    public static void main(String[] args) {
        RepositorioCandidatos repo = new RepositorioCandidatos();
        ConsultasAT at = new ConsultasAT(repo);
        ConsultasHM hm = new ConsultasHM(repo);

        System.out.println("=== AT: Atracción de Talento ===");
        imprimir("Pendientes de enviar a HM", at.pendientesDeEnviar());
        imprimir("Compatibilidad >= 90%", at.conCompatibilidadMinima(90));
        imprimir("Búsqueda 'an'", at.buscarPorNombre("an"));
        System.out.println("\n> Candidatos por fase: " + at.contarPorFase());

        System.out.println("\n>> AT envía a Carlos Mendoza (id 2) a HM: " + at.enviarAHm(2));

        System.out.println("\n=== HM: Hiring Manager ===");
        imprimir("Bandeja de revisión", hm.bandeja());
        imprimir("Finalistas", hm.finalistas());
        imprimir("Top 3 por compatibilidad", hm.topN(3));
        System.out.printf("%n> Promedio compatibilidad en HM: %.1f%%%n", hm.promedioCompatibilidad("HM"));
        System.out.println("> Resumen por estado: " + hm.resumenPorEstado());
    }
}
