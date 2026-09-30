



        /*

        1. SELECCIONAR EL BANCO


        */

        const banco = document.getElementById("banco");


        /*

        2. SELECCIONAR TODAS LAS LISTAS DE LOS DIAS


        */

        const dias = document.querySelectorAll(".dia");


        /*
        3. FUNCION PARA CALCULAR LAS HORAS
        */

        function actualizarHoras() {


            /*
                Recorremos TODOS los dias
            */

            dias.forEach((dia) => {


                /*
                    Empezamos el contador en 0.
                    Cada dia tiene su propio contador.
                */

                let horas = 0;


                /*
                .children


                children devuelve los elementos HTML hijos
                que existen dentro de la lista.

                Por ejemplo:

                <ul id="lunes">

                    <li>Actividad 1</li>
                    <li>Actividad 2</li>

                */

                for (const actividad of dia.children) {


                    /*
                        dataset.horas obtiene la horas
                        Por eso usamos Number() para "2" -> 2
                    */

                    horas += Number(actividad.dataset.horas);

                }


                /*
                MOSTRAR LAS HORAS
                Se inseta el total de horas en la parte de total
                */

                dia.parentElement
                    .querySelector(".total")
                    .textContent = `(${horas} h)`;


                /*
                =================================================
                SOBRECARGA
                =================================================

                quita la clase.

                IMPORTANTE PARA EL EXAMEN:

                classList permite agregar, eliminar
                y alternar clases CSS.
                */

                dia.parentElement.classList.toggle(
                    "sobrecargado",
                    horas > 4
                );

                if( horas > 4 ){

                    window.alert('Esta Sobrecargado');
                }

                

            });

        }


        /*
        =====================================================
        4. CREAR SORTABLE PARA LOS DIAS
        =====================================================

        Recorremos todas las listas de los dias.

        Cada lista recibe su propio objeto Sortable.
        */

        dias.forEach((lista) => {


            new Sortable(lista, {


                /*
                GROUP

                Todas las listas con:

                group: "semana"
                pueden intercambiar elementos.

                Por eso una actividad puede pasar
                lunes -> martes
                */

                group: "semana",


                /*
                Duracion de la animacion.
                */

                animation: 200,


                /*
                Clase visual del lugar donde caera.
                */

                ghostClass: "fantasma",


                /*
                Clase visual del elemento seleccionado.
                */

                chosenClass: "elegida",


                /*
                HANDLE
                Solo permite comenzar el arrastre
                desde .asa.
                En nuestro HTML tenemos:
                <span class="asa">⠿</span>
                */

                handle: ".asa",


                /*
                FILTER
                Todo elemento que tenga class="fija"
                no puede ser arrastrado.
                */

                filter: ".fija",


                /*
                ONFILTER
                Se ejecuta cuando el usuario intenta
                mover un elemento bloqueado.
                */
                onFilter: (evt) => {

                    alert(
                        "Las clases del horario no se pueden mover"
                    );

                },


                /*
                ONEND

                Se ejecuta cuando termina un movimiento.

                Aqui recalculamos las horas.

                Esto funciona cuando:

                - movemos dentro del mismo dia
                - movemos de un dia a otro
                */

                onEnd: (evt) => {

                    console.log(
                        "Actividad:",
                        evt.item.textContent
                    );

                    console.log(
                        "De:",
                        evt.from.id,
                        "posicion:",
                        evt.oldIndex
                    );

                    console.log(
                        "A:",
                        evt.to.id,
                        "posicion:",
                        evt.newIndex
                    );


                    actualizarHoras();

                }

            });

        });


        /*
        5. SORTABLE DEL BANCO

        El banco tiene una configuracion diferente.

        ¿Por que?

        Porque queremos:

        BANCO
           |
           | copiar
           v
        LUNES

        y que el elemento original permanezca
        en el banco.
        */

        new Sortable(banco, {


            /*
            GROUP COMO OBJETO

            name: "semana"

            Es el mismo grupo que utilizan los dias.

            pull: "clone"

            Significa:

            NO mover el elemento original.

            Crear una COPIA.

            put: false

            Significa:

            El banco NO recibe elementos provenientes
            de otras listas.
            */

            group: {

                name: "semana",

                pull: "clone",

                put: false

            },


            /*
            El banco no necesita reorganizarse.

            Por eso:

            sort: false
            */

            sort: false,

            animation: 200,

            ghostClass: "fantasma",

            chosenClass: "elegida",


            /*
            Solo se arrastra desde la agarradera.
            */

            handle: ".asa",


            /*
            Cuando una actividad se copia desde el banco
            hacia un dia, actualizamos las horas.
            */

            onEnd: (evt) => {

                actualizarHoras();

            }

        });


        /*
        6. PAPELERA
        La papelera:
        - Puede RECIBIR elementos.
        - NO puede sacar elementos.
        
        Por eso:

        pull: false
        put: true
        */

        const papelera = document.getElementById("papelera");


        new Sortable(papelera, {

            group: {

                name: "semana",

                /*
                    No se pueden sacar elementos
                    de la papelera.
                */

                pull: false,

                /*
                    Si permite recibir elementos.
                */

                put: true

            },


            /*
            onAdd se ejecuta cuando un elemento
            entra a esta lista.
            */

            onAdd: (evt) => {

                /*
                    evt.item es el <li> que acaba
                    de entrar a la papelera.

                    remove() elimina ese elemento
                    del HTML.
                */

                evt.item.remove();


                /*
                    Despues de eliminarlo,
                    recalculamos las horas.
                */

                actualizarHoras();

            }

        });


        /*
        CALCULO INICIAL

        Ejecutamos la funcion una vez al cargar
        la pagina.

        Asi lunes comienza mostrando:

        (2 h)
        debido a la clase fija.
        */

        actualizarHoras();
