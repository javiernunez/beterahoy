# Rutas internas — beterahoy.es

Mapa de **secciones públicas** para enlazar desde noticias. Usar **rutas relativas** (`/eventos`) salvo que convenga la URL absoluta en noticias concretas (`https://www.beterahoy.es/noticias/{slug}`).

**Regla editorial:** en cada noticia, incluir **al menos un enlace interno** cuando el tema encaje con alguna ruta de esta tabla. Ver [`/generators/news-generator.md`](../../generators/news-generator.md) → **ENLACES INTERNOS**.

## Secciones principales

| Ruta | Cuándo enlazar | Ancla sugerida (ES / VAL) |
|------|----------------|---------------------------|
| `/eventos` | Festivales, conciertos, ferias, agenda cultural | calendario de eventos / calendari d'esdeveniments |
| `/noticias` | Remisión al archivo de noticias | más noticias de Bétera / més notícies de Bétera |
| `/politica` | Plenos, mociones, gobierno municipal | política local / política local |
| `/elecciones-municipales-betera-2027` | Proceso electoral 2027 | elecciones municipales 2027 / eleccions municipals 2027 |
| `/comercios` | Comercio local, restauración | directorio de comercios / directori de comerços |
| `/asociaciones` | Asociaciones, AMPAs, casales | asociaciones del municipio / associacions del municipi |
| `/colegios` | Educación, centros escolares | colegios de Bétera / col·legis de Bétera |
| `/deportes` | Deporte local | deportes en Bétera / esports a Bétera |
| `/el-nostre-poble` | Historia, patrimonio | El nostre poble / El nostre poble |
| `/informacion-util` | Trámites, teléfonos | información útil / informació útil |
| `/videos` | Vídeos en la web | vídeos locales / vídeos locals |
| `/denuncias` | Denuncia ciudadana (con tacto) | denuncias ciudadanas / denúncies ciutadanes |

## Ejemplos por tema

- **Festes Majors, Alfàbegues, conciertos** → `/eventos`.
- **Urbanismo Mas Camarena, Torre en Conill** → noticia previa en `/noticias/{slug}` si existe; contexto en [`docs/contexto-betera/`](contexto-betera/README.md).
- **Metrobús, movilidad** → piezas relacionadas + `/informacion-util` si hay trámites.

Contexto local: [`docs/contexto-betera/README.md`](contexto-betera/README.md).
