/** Modelo: un candidato del ecosistema LiverTalent. */
public class Candidato {
    private final int id;
    private final String nombre;
    private final String puesto;
    private final int compatibilidad;   // % AssessFirst
    private int fase;                   // 1..5
    private String estado;              // AT, HM, FINALISTA, DESCARTADO

    public Candidato(int id, String nombre, String puesto, int compatibilidad, int fase, String estado) {
        this.id = id; this.nombre = nombre; this.puesto = puesto;
        this.compatibilidad = compatibilidad; this.fase = fase; this.estado = estado;
    }
    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getPuesto() { return puesto; }
    public int getCompatibilidad() { return compatibilidad; }
    public int getFase() { return fase; }
    public String getEstado() { return estado; }
    public void setFase(int fase) { this.fase = fase; }
    public void setEstado(String estado) { this.estado = estado; }

    @Override public String toString() {
        return String.format("#%d %-16s %-32s %3d%%  fase %d  [%s]", id, nombre, puesto, compatibilidad, fase, estado);
    }
}
