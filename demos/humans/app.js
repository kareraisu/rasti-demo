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

const access = () => {
    const isLogged = !!humans.props.user
    if (!isLogged) humans.props.toast_msg = "Please log in first!"
    return isLogged
}


const config = {

    pages : {

        login : {
            url : 'login',
            in({loggedout}) {
                if (loggedout) {
                    humans.props.toast_msg = "Thanks for trying out rasti.js!"
                }
            },
        },

        main : {
            url : 'main',
            access,
        },

        about : {
            url : 'about',
            access,
            out(params) {
                const lang = humans.langs[humans.active.lang]
                const things = lang.things.split(', ')
                const icons = 'accept warning error robot squid rainbow'.split(' ')
                humans.props.toast_icon = icons[rasti.utils.random() % icons.length]
                humans.props.toast_msg = lang.dont_forget + things[rasti.utils.random() % things.length]
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

        features : `navigation | ajax (simulated) | props | templates (triggered and prop-bound) |
            paging | actions (toggle) | themes | i18n | data-driven elements (blocks, lists and tables) |
            element dependency | field validation | tabs, modals and menus | responsive layout | fx`,

        stats : `File | LOC | KBs
                index.html | ~200 | 5.5
                app.js | ~100 | 3.0
                app.css | ~80 | 1.2
                config.js | ~120 | 3.5
                Total | ~500 | 13.2`

    },


    methods : {

        login(reqdata, cb) {   
            $('.error').hide()
            // ajax simulation
            setTimeout(_ => {
                this.backend.checkUser(reqdata.user) && reqdata.pass == '12341234'
                    ? this.navTo('main')
                    : this.props.toast_msg = this.langs[this.active.lang].error_login
                cb()
            }, 1000)
        },

        logout() {
            this.props.user = ''
            this.history.clear()
            this.navTo('login', {loggedout: true})
        },

        getPeople(reqdata, render) {
            this.props.filters.reqdata = JSON.stringify(reqdata, null, 2)
            // ajax simulation
            setTimeout(_ => {
                const people = this.backend.getPeople(reqdata)
                $('[tab-label="1"]').click()
                render(people)
            }, 1000)
        },

        showDetail(e) {
            this.props.person = e.currentTarget.innerHTML
            $('[modal=detail]').show()
        },

        imgFallback(e) {
            $(e.target).off('error')
            e.target.src = 'img/user.png'
        },

    }

}

humans
.config(config)
.init({
    root : 'login',
    history : true,
    //persist : false,
    //theme : 'blue',
    //lang : 'es',
})
