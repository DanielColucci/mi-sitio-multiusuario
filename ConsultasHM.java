import java.util.*;
import java.util.stream.Collectors;

/** Consultas del rol Hiring Manager (HM). Clase distinta a AT, misma lista de datos. */
public class ConsultasHM {
    private final List<Candidato> datos;
    public ConsultasHM(RepositorioCandidatos repo) { this.datos = repo.todos(); }

    /** Bandeja de revisión: candidatos enviados por AT. */
    public List<Candidato> bandeja() {
        return datos.stream().filter(c -> c.getEstado().equals("HM")).collect(Collectors.toList());
    }
    /** SELECT * WHERE estado = 'FINALISTA' */
    public List<Candidato> finalistas() {
        return datos.stream().filter(c -> c.getEstado().equals("FINALISTA")).collect(Collectors.toList());
    }
    /** SELECT AVG(compatibilidad) WHERE estado = ? */
    public double promedioCompatibilidad(String estado) {
        return datos.stream().filter(c -> c.getEstado().equals(estado))
                .mapToInt(Candidato::getCompatibilidad).average().orElse(0);
    }
    /** SELECT TOP n ORDER BY compatibilidad DESC */
    public List<Candidato> topN(int n) {
        return datos.stream().sorted(Comparator.comparingInt(Candidato::getCompatibilidad).reversed())
                .limit(n).collect(Collectors.toList());
    }
    /** SELECT estado, COUNT(*) GROUP BY estado */
    public Map<String, Long> resumenPorEstado() {
        return datos.stream().collect(Collectors.groupingBy(Candidato::getEstado, TreeMap::new, Collectors.counting()));
    }
}
