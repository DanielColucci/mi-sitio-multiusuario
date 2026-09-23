import java.util.*;
import java.util.stream.Collectors;

/** Consultas del rol Atracción de Talento (AT). Simula SELECT sobre la lista. */
public class ConsultasAT {
    private final List<Candidato> datos;
    public ConsultasAT(RepositorioCandidatos repo) { this.datos = repo.todos(); }

    /** SELECT * WHERE estado = 'AT' ORDER BY compatibilidad DESC */
    public List<Candidato> pendientesDeEnviar() {
        return datos.stream().filter(c -> c.getEstado().equals("AT"))
                .sorted(Comparator.comparingInt(Candidato::getCompatibilidad).reversed())
                .collect(Collectors.toList());
    }
    /** SELECT * WHERE compatibilidad >= minimo */
    public List<Candidato> conCompatibilidadMinima(int minimo) {
        return datos.stream().filter(c -> c.getCompatibilidad() >= minimo).collect(Collectors.toList());
    }
    /** SELECT * WHERE nombre LIKE '%texto%' */
    public List<Candidato> buscarPorNombre(String texto) {
        String t = texto.toLowerCase();
        return datos.stream().filter(c -> c.getNombre().toLowerCase().contains(t)).collect(Collectors.toList());
    }
    /** SELECT fase, COUNT(*) GROUP BY fase */
    public Map<Integer, Long> contarPorFase() {
        return datos.stream().collect(Collectors.groupingBy(Candidato::getFase, TreeMap::new, Collectors.counting()));
    }
    /** UPDATE: transfiere un candidato al Hiring Manager. */
    public boolean enviarAHm(int id) {
        for (Candidato c : datos) {
            if (c.getId() == id && c.getEstado().equals("AT")) { c.setEstado("HM"); c.setFase(4); return true; }
        }
        return false;
    }
}
