# Retrospectiva del proyecto — Corte II

## Portada

| Ítem | Información |
|---|---|
| **Nombre del grupo** | FullMobileCloud |
| **Proyecto** | MediHIS |
| **Asignatura** | Mobile and Cloud Computing |
| **Corte** | Corte II |
| **Integrantes** | Daniel Castro |
| **Repositorio** | [MediHis — FullMobileCloud](https://github.com/FullMobileCloud/MediHis) |

---

## Resumen de la retrospectiva

Durante la retrospectiva del proyecto MediHIS se revisaron los avances obtenidos, la organización del trabajo y la estructura técnica de la aplicación. Se destacó como aspecto positivo el planteamiento de una solución orientada a la digitalización de historias clínicas, junto con la integración de tecnologías de desarrollo web/móvil y servicios Cloud como Firebase.

También se identificaron oportunidades de mejora relacionadas con la gestión y trazabilidad del proyecto. El tablero Kanban fue desarrollado inicialmente en una plataforma externa a la cual no fue posible acceder durante la revisión; por esta razón, se acordó centralizar su gestión en GitHub Projects, vinculándolo directamente con los Issues del repositorio.

En la revisión técnica se evidenció que el proyecto contiene una aplicación React/Vite con una estructura inicial para Capacitor y Android. Asimismo, se identificó que, aunque existen carpetas destinadas a una arquitectura MVVM (`models`, `repositories`, `services`, `viewmodels` y `views`), estas aún no contienen una implementación funcional de sus responsabilidades. Gran parte de la lógica y la interfaz se encuentran concentradas en el archivo `App.tsx`.

A partir de estos hallazgos, el equipo priorizó acciones de mejora para fortalecer la gestión ágil del proyecto, orientar la solución hacia un enfoque móvil y aplicar de manera correcta la separación de responsabilidades del patrón MVVM.

---

## Aspectos positivos identificados

- Se abordó una necesidad real relacionada con la digitalización de historias clínicas mediante el proyecto MediHIS.
- El repositorio centraliza artefactos importantes del proyecto, como documentación, configuración de Firebase, reglas de Firestore y el archivo APK generado.
- Se cuenta con una estructura inicial para una aplicación que integra React, Vite, Capacitor y Android.
- Se crearon directorios iniciales para organizar el proyecto mediante el patrón MVVM.
- Se definieron acciones de mejora a partir de la discusión de retrospectiva, promoviendo la mejora continua del equipo.

---

## Acciones de mejora

| Acción | Responsable | Issue asociado | Prioridad |
|---|---|---|---|
| Centralizar el tablero Kanban y la gestión de tareas en GitHub Projects, vinculando los Issues del repositorio y configurando la columna Acciones de mejora. | Daniel Castro | [#19 — [RETRO] Centralizar el tablero Kanban en GitHub Projects](https://github.com/FullMobileCloud/MediHis/issues/19) | Media |
| Migrar o reestructurar el proyecto para cumplir con el enfoque de aplicación móvil nativa o multiplataforma solicitado para la asignatura. | Daniel Castro | [#20 — [RETRO] Migrar el proyecto web React/Vite a una aplicación móvil](https://github.com/FullMobileCloud/MediHis/issues/20) | Alta |
| Implementar correctamente el patrón MVVM, separando la interfaz, la lógica de presentación, los modelos, los repositorios y los servicios. | Daniel Castro | [#21 — [RETRO] Implementar correctamente el patrón de arquitectura MVVM](https://github.com/FullMobileCloud/MediHis/issues/21) | Alta |

---

## Enlaces de seguimiento

| Recurso | Enlace |
|---|---|
| Repositorio principal del proyecto | [https://github.com/FullMobileCloud/MediHis](https://github.com/FullMobileCloud/MediHis) |
| Discusión de retrospectiva | [https://github.com/FullMobileCloud/MediHis/discussions/categories/retrospectiva](https://github.com/FullMobileCloud/MediHis/discussions/categories/retrospectiva) |
| Tablero de GitHub Projects Retrospectiva| [https://github.com/orgs/FullMobileCloud/projects/2](https://github.com/orgs/FullMobileCloud/projects/2) |
| Issue: Centralizar tablero Kanban | [https://github.com/FullMobileCloud/MediHis/issues/19](https://github.com/FullMobileCloud/MediHis/issues/19) |
| Issue: Migración a aplicación móvil | [https://github.com/FullMobileCloud/MediHis/issues/20](https://github.com/FullMobileCloud/MediHis/issues/20) |
| Issue: Implementación de arquitectura MVVM | [https://github.com/FullMobileCloud/MediHis/issues/21](https://github.com/FullMobileCloud/MediHis/issues/21)|
| Milestone CORTE II | [https://github.com/FullMobileCloud/MediHis/milestone/1](https://github.com/FullMobileCloud/MediHis/milestone/1) |

---

## Evidencias de los entregables

### 1. Repositorio y documentación

| Evidencia | Descripción | Enlace |
|---|---|---|
| Repositorio MediHIS | Repositorio central del proyecto y de los entregables del equipo. | [Ver repositorio](https://github.com/FullMobileCloud/MediHis) |
| README principal | Documento de presentación, alcance y guía general del proyecto. | [Ver README](https://github.com/FullMobileCloud/MediHis/blob/main/README.md) |
| README de la aplicación | Documentación específica ubicada dentro de la carpeta `medihis`. | [Ver README de la aplicación](https://github.com/FullMobileCloud/MediHis/blob/main/medihis/README.md) |

### 2. Evidencias técnicas

| Evidencia | Descripción | Enlace |
|---|---|---|
| Código fuente de la aplicación | Código principal de la aplicación dentro de la carpeta `medihis`. | [Ver código fuente](https://github.com/FullMobileCloud/MediHis/tree/main/medihis) |
| Archivo APK | Evidencia de la generación de un paquete instalable para Android. | [Ver MediHIS.apk](https://github.com/FullMobileCloud/MediHis/blob/main/MediHIS.apk) |
| Configuración Firebase | Archivo de configuración de Firebase utilizado por el proyecto. | [Ver firebase.ts](https://github.com/FullMobileCloud/MediHis/blob/main/medihis/src/firebase.ts) |
| Reglas de Cloud Firestore | Reglas de seguridad configuradas para la base de datos Cloud Firestore. | [Ver firestore.rules](https://github.com/FullMobileCloud/MediHis/blob/main/firestore.rules) |
| Configuración Capacitor | Configuración para la integración y empaquetado de la aplicación en Android. | [Ver capacitor.config.ts](https://github.com/FullMobileCloud/MediHis/blob/main/medihis/capacitor.config.ts) |

---

## Capturas de pantalla

### Discusión de retrospectiva

<img width="1660" height="969" alt="image" src="https://github.com/user-attachments/assets/01f9046c-87dd-4dea-8edd-64482286cf16" />

**Descripción:** Captura de la discusión de GitHub donde se documentaron los aspectos positivos, las oportunidades de mejora y las acciones propuestas.

### Tablero GitHub Projects

<img width="1670" height="960" alt="image" src="https://github.com/user-attachments/assets/17a80cf0-070d-4f7a-b844-000a9379d2e0" />

**Descripción:** Captura del tablero de Retrospectivas en GitHub Projects, mostrando las columnas de trabajo y los Issues ubicados en la columna Acciones de mejora.

### Issues creados

<img width="1657" height="965" alt="image" src="https://github.com/user-attachments/assets/316a07e1-b32d-4527-9e5a-3cfb01ad7bfb" />

**Descripción:** Captura de los Issues creados con las etiquetas `retro-action`, `mejora`, responsables asignados y milestone **CORTE II**.

### Historial de commits y Pull Requests

<img width="1659" height="979" alt="image" src="https://github.com/user-attachments/assets/64ce7424-e505-4960-afed-dfaf7f137d9d" />

**Descripción:** Captura del historial de commits, ramas de trabajo y Pull Requests realizados durante el desarrollo.
