# MediHIS

Aplicación móvil para el registro y consulta básica de historias clínicas.

> **Estado:** Proyecto académico — Producto Mínimo Viable (MVP).

## Visión del proyecto

MediHIS busca apoyar la digitalización básica del registro y la consulta de historias clínicas. La aplicación permitirá al personal de salud crear y guardar historias asociadas al documento del paciente, y a los pacientes consultar los registros encontrados con su documento.

La primera versión se enfoca en un flujo simple, funcional y demostrable. En futuras versiones, el proyecto podrá incorporar controles de acceso más robustos, auditoría, edición de registros, notificaciones e integración con otros sistemas de salud.

## Problema a resolver

En algunos contextos, la información de atención médica puede estar dispersa en documentos físicos o registros separados. Esto dificulta encontrar antecedentes de un paciente, toma tiempo y puede generar duplicación de información.

MediHIS propone centralizar, en una aplicación móvil, el registro básico de una atención clínica y la consulta de historias previamente guardadas. Cada historia quedará asociada al número de documento del paciente para facilitar su búsqueda.

## Solución propuesta

La aplicación tendrá una pantalla inicial con dos opciones de acceso:

| Tipo de usuario | Funciones en el MVP |
| --- | --- |
| Personal de salud | Registrarse, iniciar sesión, crear historias clínicas y consultar registros guardados |
| Paciente | Buscar y abrir historias clínicas usando el número de documento |

### Flujo del personal de salud

```text
Inicio
  → Personal de salud
  → Registro o inicio de sesión
  → Ingresar documento del paciente
  → Continuar
  → Diligenciar historia clínica
  → Guardar en la base de datos
  → Consultar historias cuando sea necesario
```

### Flujo del paciente

```text
Inicio
  → Paciente
  → Ingresar número de documento
  → Buscar historias
  → Ver resultados
  → Abrir historia clínica
```

## Alcance del MVP

### Incluye

- Pantalla inicial con las opciones **Personal de salud** y **Paciente**.
- Registro básico del personal de salud con nombre, correo y contraseña.
- Inicio de sesión con correo y contraseña.
- Búsqueda de paciente mediante número de documento.
- Formulario para crear historias clínicas.
- Campos básicos: documento del paciente, motivo de consulta, observaciones y diagnóstico.
- Lista desplegable para seleccionar el diagnóstico.
- Almacenamiento de las historias clínicas en la nube.
- Consulta de historias clínicas por número de documento.
- Visualización del detalle de una historia clínica.

### No incluye en esta versión

- Recuperación de contraseña.
- Verificación por SMS o correo.
- Edición o eliminación de historias clínicas.
- Carga de exámenes, recetas, fotos o archivos.
- Firma digital.
- Reportes, notificaciones o panel administrativo.
- Integración con EPS, IPS u otros sistemas de salud.
- Auditoría avanzada o interoperabilidad clínica.

## Stack tecnológico

| Componente | Tecnología | Uso en MediHIS |
| --- | --- | --- |
| Aplicación móvil | Flutter | Desarrollo de la interfaz móvil con una sola base de código |
| Lenguaje | Dart | Lógica, pantallas, navegación y formularios |
| Autenticación | Firebase Authentication | Registro e inicio de sesión del personal de salud |
| Base de datos | Cloud Firestore | Almacenamiento de usuarios e historias clínicas |
| Nube | Firebase | Servicios de autenticación, datos y sincronización |
| Seguridad | Firebase Security Rules | Reglas básicas de lectura y escritura de datos |
| Control de versiones | Git y GitHub | Trabajo colaborativo y administración del código fuente |
| Diseño | Canva | Bocetos y prototipos de las interfaces |
| Desarrollo | Visual Studio Code o Android Studio | Programación y pruebas de la aplicación |

Se eligió Flutter con Firebase porque permite desarrollar una aplicación móvil y conectar autenticación y base de datos en la nube sin construir inicialmente un servidor propio.

## Arquitectura básica

```text
Usuarios
(Personal de salud / Paciente)
            │
            ▼
App MediHIS — Flutter / Dart
            │
     ┌──────┴──────┐
     ▼             ▼
Firebase Auth   Cloud Firestore
```

## Modelo de datos inicial

```text
usuarios
└── idUsuario
    ├── nombre
    ├── correo
    ├── tipoUsuario: personal_salud
    └── fechaRegistro

historias_clinicas
└── idHistoria
    ├── documentoPaciente
    ├── motivoConsulta
    ├── observaciones
    ├── diagnostico
    ├── fechaCreacion
    └── idPersonalSalud
```

Ejemplo de una historia clínica:

```json
{
  "documentoPaciente": "1234567890",
  "motivoConsulta": "Dolor de cabeza frecuente",
  "observaciones": "El paciente informa dolor durante los últimos tres días.",
  "diagnostico": "Cefalea"
}
```

## Seguridad y privacidad

MediHIS es un prototipo académico. El personal de salud deberá autenticarse para crear historias clínicas y las contraseñas serán administradas por Firebase Authentication.

La consulta del paciente por número de documento se incluye únicamente para demostrar el flujo solicitado. En una versión real se debe implementar verificación adicional de identidad y controles de acceso más estrictos, debido a que la información clínica es privada y sensible.

## Próximos pasos

1. Crear y configurar el proyecto Flutter.
2. Configurar Firebase Authentication.
3. Crear la base de datos Cloud Firestore.
4. Diseñar las pantallas principales.
5. Implementar registro e inicio de sesión.
6. Implementar creación y guardado de historias clínicas.
7. Implementar consulta por número de documento.
8. Realizar pruebas básicas y preparar la demostración.

## Equipo

Proyecto desarrollado para la materia **Mobile And Cloud Computing**.
