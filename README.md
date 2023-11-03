# DEVSU - PRODUCT MANANGER - BANCO PICHINCHA

> Fecha de actualización 03/11/2023
> Versión 0.1.0

![](https://ricardoalonne.github.io/devsu-bpichincha-productmanager/assets/images/bp_logo.webp)

# Acerca del proyecto

Este proyecto consiste en un administrador de productos, el cual permite listar, registrar, modificar y eliminar productos. Puede visualizar la demo en el siguiente [enlace](https://ricardoalonne.github.io/devsu-bpichincha-productmanager/).

**Contenido**

1. [Tecnologías](#tecnologías)
2. [Requerimientos](#requerimientos)
3. [Levantar el proyecto](#levantar-el-proyecto)
4. [Organización del repositorio](#organización-del-repositorio)
5. [ Pruebas unitarias](#pruebas-unitarias)

## Tecnologías

| Tecnología | Versión  | Uso                   |
| ---------- | -------- | --------------------- |
| Angular    | `16.2.0` | Desarrollo FrontEnd   |
| Typescript | `5.1.3`  | Desarrollo FrontEnd   |
| Jest       | `29.7.0` | Desarrollo de Pruebas |

## Requerimientos

| Tecnología         | Versión   |
| ------------------ | --------- |
| Node               | `18.17.0` |
| Visual Studio Code | `1.83`    |
| ThunderClient      | `2.14.1`  |

## Levantar el proyecto

Primero es necesario instalar las dependencias del proyecto, una vez ubicado en la carpeta raíz, ejecutar el siguiente comando:
| Comando | Abreviación|
|----------------|------------------|
| `npm install`| `npm i` |

Previamente necesitará tener instalado el cli de Angular, en caso que no lo tenga puede proceder a instalarlo de forma global con el siguiente comando:

    npm install -g @angular/cli

Una vez instalado el cli, procede a ejecutar cualquiera de los siguientes comandos:
| Comando | Abreviación| Descripción|
|----------------|------------------|------------------|
| `ng serve`| `ng s` | El proyecto empezará a levantarse|
| `ng serve -o` | `ng s -o` | El proyecto empezará a levantarse y se abrirá en su navegador preterminado. |

**Importante:** El proyecto se levantará en el puerto _[http://localhost:4515/](http://localhost:4515/)_.

## Organización del repositorio

El proyecto consta de 3 ramas:
| Rama | Uso
|--|--|
| [main](https://github.com/ricardoalonne/devsu-bpichincha-productmanager/tree/main)| Esta rama contiene una versión estable, y o esta desplegada o esta lista para hacerlo. Los cambios en esta versión ya han sido probados anteriormente. | |
| [development](https://github.com/ricardoalonne/devsu-bpichincha-productmanager/tree/development)| Esta rama es de desarrollo, sus cambios pueden requerir revisión. Cuando los cambios están estables se realiza un **pull request** a la rama **main** |
| [production](https://github.com/ricardoalonne/devsu-bpichincha-productmanager/tree/production)| En esta rama se guarda la versión **main** desplegada y operativa para el usuario final. |

## Pruebas unitarias

Para ejecutar las pruebas unitarias será necesario el uso de `npm run` junto a los siguientes comandos de acuerdo a lo requerido.
| Comando | Descripción|
|----------------|------------------|
| `npm run jest-test`| Ejecuta sólo una vez las pruebas unitarias con jest. |
| `npm run jest-test:watch`| Ejecuta las pruebas unitarias con jest cada que se hace un cambio y se guarda. |
| `npm run jest-test:coverage`| Ejecuta las pruebas unitarias mostrando al final el % de coverage. |
