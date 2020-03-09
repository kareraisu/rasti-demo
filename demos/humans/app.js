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
    },

    main : {
        url : 'main',
        init : _ => {
            $('[template=results]').on('click', '.card', e => {
                e.currentTarget.classList.toggle('modal')
            })
        }
    },

    about : {
        url : 'about',
        out : params => {
            const lang = app.langs[app.active.lang]
            const things = lang.things.split(', ')
            const icons = 'accept warning error robot squid rainbow'.split(' ')
            app.props.toast_icon = icons[rasti.utils.random() % icons.length]
            app.props.toast_msg = lang.dont_forget + things[rasti.utils.random() % things.length]
        },
    }

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

    stats : `File,LOC,KBs
            index.html,~200,<1
            app.js,~100,<1
            app.css,~80,<1
            config.js,~120,<1
            TOTAL,~500,<4
            `

},


methods : {

    login : (reqdata, cb) => {   
        $('.error').hide()
        // ajax simulation
        setTimeout(_ => {
            app.backend.checkUser(reqdata.user) && reqdata.pass == '12341234'
                ? app.navTo('main')
                : $('.error').show()
            cb()
        }, 1000)
    },

    logout : _ => {
        app.props.user = ''
        app.history.clear()
        app.navTo('login')
    },

    getPeople : (reqdata, render) => {
        app.props.filters.reqdata = JSON.stringify(reqdata, null, 2)
        // ajax simulation
        setTimeout(_ => {
            const people = app.backend.getPeople(reqdata)
            $('[tab-label="1"]').click()
            render(people)
        }, 1000)
    },

    imgFallback : img => {
        img.src = 'img/user.png'
    },

}

})


app.init({
    root : 'login',
    history : true,
    //theme : 'blue',
    //lang : 'es',
})
