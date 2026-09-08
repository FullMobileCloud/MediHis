# MediHis

Repositorio para el proyecto MediHis

## Arquitectura MVVM con Firebase

Este proyecto sigue el patrÃ³n de diseÃ±o **MVVM (Model-View-ViewModel)** integrado con servicios de Firebase (Auth y Firestore).

### Diagrama de Arquitectura

```mermaid
flowchart TB
    subgraph View["Vista (UI)"]
        V1[Activity / Fragment / Composable]
        V2[Observa LiveData / StateFlow del ViewModel]
        V3[EnvÃ¬a eventos de usuario al ViewModel]
    end

    subgraph ViewModel["ViewModel"]
        VM1[Expone estados UI (LiveData/StateFlow)]
        VM2[Recibe eventos de la Vista]
        VM3[Coordina lÃ³gica de negocio]
        VM4[No conoce la Vista]
    end

    subgraph Model["Modelo / Repository"]
        R1[Repository]
        R2[Abstrae fuentes de datos]
    end

    subgraph Firebase["Servicios Firebase"]
        FA[Firebase Auth]
        FF[Firebase Firestore]
    end

    View -->|eventos| ViewModel
    ViewModel -->|actualiza estado| View
    ViewModel -->|llama| Model
    Model -->|usa| Firebase
    FA -->|autenticaciÃ³n| R1
    FF -->|CRUD datos| R1

    style View fill:#e3f2fd,stroke:#1976d2
    style ViewModel fill:#fff3e0,stroke:#f57c00
    style Model fill:#e8f5e9,stroke:#388e3c
    style Firebase fill:#f3e5f5,stroke:#7b1fa2
```

### Componentes

| Capa | Responsabilidad | TecnologÃ¬a |
|------|-----------------|------------|
| **View** | Mostrar UI, capturar eventos de usuario | Android (Activity/Fragment/Compose) |
| **ViewModel** | LÃ³gica de presentaciÃ³n, estados UI | ViewModel + LiveData/StateFlow |
| **Repository** | AbstracciÃ³n de fuentes de datos | Repository Pattern |
| **Firebase Auth** | AutenticaciÃ³n de usuarios | FirebaseAuth |
| **Firebase Firestore** | Base de datos NoSQL en la nube | FirebaseFirestore |

### Flujo de Datos

1. **View** observa los estados expuestos por el **ViewModel**.
2. El usuario interactÃºa con la UI y envÃ¬a eventos al **ViewModel**.
3. El **ViewModel** coordina con el **Repository** para obtener o guardar datos.
4. El **Repository** usa **Firebase Auth** para autenticaciÃ³n y **Firestore** para persistencia.
5. Los cambios se propagan de vuelta al **ViewModel** y luego a la **View**.

---

*Proyecto desarrollado en el marco de Mobile & Cloud Computing*
