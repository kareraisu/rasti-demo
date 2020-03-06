app.extend({

state: {
    editing : '',
},


pages : {
    main : {
        init : _ => {
            $('nav').on('click', 'a', e => {
                let $el = $(e.target)
                $el.siblings().removeClass('active')
                $el.addClass('active')
            })
        },
        in : params => {
            if (!app.data.map) rasti.utils.inject('https://maps.googleapis.com/maps/api/js?key=AIzaSyAFVnZqxJOkkZYCbWSH-KYwEhzGSflloQQ&callback=app.methods.initMap')
            if (!params) return
            app.methods.changeTo(params.name)
        }
    },
},


methods : {
    initMap : _ => {
        if (app.data.map) return

        var map = app.data.map = new google.maps.Map($('#map')[0], {
          zoom: 15,
          center: app.data.locales[0].pos
        })

        app.data.locales.forEach(loc => {
            loc.marker = new google.maps.Marker({
              position: loc.pos,
              map: map
            })
        })
    },

    filter : e => {
        let $el = $(e.target)
        $el.siblings().removeClass('active')
        $el.addClass('active')
        var cat = $el.attr('value')
        $('[template=productos]').children().hide()
            .filter(function(i,el){
                return this.getAttribute('data-cat') == cat
            }).show()
    },

    changeTo : local => {
        app.setTheme(local)
        $('[name=logo]').css('background-image', `url(img/logo-${local}.png)`)
        $('.toggle').hide()
        $('.'+local).show()
        // TODO : especializar categorias y productos por local
        app.data.locales.forEach(loc => {
            loc.marker && loc.marker.setMap(loc.nombre == local ? app.data.map : null)
        })
        $('[href="#inicio"]').click()
    },

    imgFallback : img => {
        img.src = 'img/comidas.png'
    },
},


crud : {
    cats : {
        create : cat => Promise(resolve => {
            console.log('Adding new category...')
            setTimeout(resolve, 1000);
        }),

        update : (cat, newcat) => Promise(resolve => {
            console.log('Updating category...')
            setTimeout(resolve, 1000);
        }),

        delete : cat => {
            return app.data.categorias.remove(cat)
        },
    }
},


themes : {
    pizzeria : {
        font : 'normal 14px tahoma',
        palette : {
            detail : '#ef393f',
            mid    : '#be3427',
            dark   : '#772922',
        },
        maps : {
            light : {
                page    : 'light transparent',
                section : 'detail darken',
                field   : 'white dark',
                panel   : 'mid transparent',
                /*
                btn     : 'detail light',
                header  : 'dark',
                label   : 'mid',
                text    : 'darker',
                */
            },
        }
    },

    cucina : {
        font : 'normal 14px tahoma',
        palette : {
            detail : '#3ba351',
            light  : '#69c97e',
            mid    : '#297038',
            dark   : '#374936',
        },
        maps : {
            light : {
                page    : 'dark transparent',
                section : 'detail darken',
                field   : 'white dark',
                panel   : 'mid transparent',
                /*
                btn     : 'detail light',
                header  : 'dark',
                label   : 'mid',
                text    : 'darker',
                */
            },
        }
    },
},


})


app.init({
    theme: "cucina light",
})
