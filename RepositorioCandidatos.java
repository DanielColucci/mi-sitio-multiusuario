import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/** "Tabla" en memoria: guarda la lista base sobre la que se hacen las consultas. */
public class RepositorioCandidatos {
    private final List<Candidato> tabla = new ArrayList<>();

    public RepositorioCandidatos() {
        tabla.add(new Candidato(1, "Ana López", "Gerente de Proyectos E-commerce", 92, 3, "AT"));
        tabla.add(new Candidato(2, "Carlos Mendoza", "Desarrollador Backend Senior", 88, 3, "AT"));
        tabla.add(new Candidato(3, "Sofia Herrera", "Analista de Datos Jr.", 95, 4, "HM"));
        tabla.add(new Candidato(4, "Diego Ramírez", "Arquitecto de Soluciones", 81, 3, "AT"));
        tabla.add(new Candidato(5, "Valeria Cruz", "Product Owner", 90, 4, "HM"));
        tabla.add(new Candidato(6, "Luis Ortega", "QA Automation Lead", 73, 4, "DESCARTADO"));
        tabla.add(new Candidato(7, "Marina Salas", "Líder Técnico Mobile", 97, 5, "FINALISTA"));
    }
    /** Devuelve una vista de solo lectura para que las consultas no modifiquen la tabla. */
    public List<Candidato> todos() { return Collections.unmodifiableList(tabla); }
}
