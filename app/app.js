const skills = {
    tech   : 'HTML, CSS, Javascript, Node, git, Angular, React, Cordoba, Java, Maven, Hibernate, SQL, Mongo, Networking, Security, PaaS, Docker, Bash',
    people : 'Búsqueda, Selección, Psicología, Word, Excel, Powerpoint',
    design : 'Creatividad, Dibujo, Composición, Teoría del color, Fotografía, Branding, UI & UX, Photoshop, Illustrator, After Effects, Blender',
    manage : 'Planeamiento, Estrategia, Coordinación, Negociación, Análisis de costos, Word, Excel, Powerpoint',
}

const areaSkills = {
    SDA : 'tech',
    'I+D' : 'tech',
    'Recursos Humanos' : 'people',
    Comunicación : 'design',
    Administración : 'manage',
}


app.extend({

pages : {

    login : {

        in : params => {
            
        },

        out : params => {
            
            if (params) {
                $('[nav=login]').css({
                    'background-image' : `url(img/${ params.user }.jpg)`,
                    'background-size' : 'contain',
                })
            }
        },
    },


    main : {

        url : 'the-main-page',

        init : _ => {
            $('[panel=results]').on('click', '.card', e => {
                e.currentTarget.classList.toggle('modal')
            })
        }
    },

},


data : {

    area : ['Todas', ...Object.keys(areaSkills)],

    skills : (render, deps) => {
        if (deps) {
            const skillType = areaSkills[ deps.area ]
            render( skills[ skillType ] )
        }
    },

    features : 'navigation, ajax, templates, paging, actions, themes, i18n, tabs, modals, blocks, field dependency, field validation, responsive',

},


methods : {

    getPeople : (reqdata, render) => {

        $('[name=reqdata]').val( JSON.stringify(reqdata, null, 2) )

        // ajax simulation
        setTimeout(function() {
            var people = app.backend.getPeople(reqdata)
            $('[tab-label="1"]').click()
            render(people)
        }, 1000)

    },


    login : e => {
        if ($('[prop=pass]').val() == '1234') {
            app.navTo('main', {user: $('[prop=user]').val()})
        }
    },


    imgFallback : img => {
        img.src = 'img/user.png'
    },

}

})


app.init({
    root : 'login'
    //theme : 'blue',
    //lang : 'es',
    //persist : true,
})
