// Datos centralizados de candidatos (Seed Data compatible con el reto)
const candidatosData = [
    {
        id: 1,
        nombre: "Ana López",
        puestoActual: "Gerente de Proyectos E-commerce",
        empresaActual: "Retail Digital S.A.",
        compatibilidad: "92%",
        fase: "Fase 3: Búsqueda y Atracción",
        notasAt: "Excelente visión de negocio y enfoque en optimización de conversión[cite: 2].",
        estado: "En Proceso"
    },
    {
        id: 2,
        nombre: "Carlos Mendoza",
        puestoActual: "Desarrollador Backend Senior",
        empresaActual: "Soluciones Tech S. de R.L.",
        compatibilidad: "88%",
        fase: "Fase 3: Búsqueda y Atracción",
        notasAt: "Dominio excepcional de microservicios y Spring Boot. Sólido fit técnico[cite: 2].",
        estado: "En Proceso"
    },
    {
        id: 3,
        nombre: "Sofia Herrera",
        puestoActual: "Analista de Datos Jr.",
        empresaActual: "Consultoría Analítica Co.",
        compatibilidad: "95%",
        fase: "Fase 4: Evaluación con HM",
        notasAt: "Conocimientos sólidos en SQL y Tableau. Demostró gran capacidad analítica[cite: 2].",
        estado: "Enviado a HM"
    }
];

// Función para simular el envío de AT a HM
function enviarAHm(nombreCandidato) {
    alert(`[AT] ¡Acción exitosa! El candidato/a ${nombreCandidato} ha sido transferido al Hiring Manager (HM) para su evaluación técnica.`);
}

// Función para emitir veredicto de Hiring Manager
function veredictoHm(nombreCandidato, decision) {
    if(decision === 'finalista') {
        alert(`[HM] ${nombreCandidato} ha sido marcado con éxito como FINALISTA. Se procederá a solicitar la carta-oferta.`);
    } else {
        alert(`[HM] ${nombreCandidato} ha sido DESCARTADO del proceso.`);
    }
}