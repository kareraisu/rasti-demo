const config = {

props : {
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
            if (!food.data.map)
                rasti.utils.inject('https://maps.googleapis.com/maps/api/js?key=AIzaSyAFVnZqxJOkkZYCbWSH-KYwEhzGSflloQQ&callback=food.methods.initMap')
            if (!params) return
            food.methods.changeTo(params.name)
        }
    },
},


methods : {
    initMap() {
        if (this.data.map) return

        var map = this.data.map = new google.maps.Map($('#map')[0], {
          zoom: 15,
          center: this.data.locales[0].pos
        })

        this.data.locales.forEach(loc => {
            loc.marker = new google.maps.Marker({
              position: loc.pos,
              map: map
            })
        })
    },

    filter(e) {
        let $el = $(e.target)
        $el.siblings().removeClass('active')
        $el.addClass('active')
        var cat = $el.attr('value')
        const prods = this.data.productos.filter(el => el.categoria == cat)
        this.render('productos', prods)
    },

    changeTo(local) {
        this.setTheme(local)
        $('[name=logo]')[0].style['background-image'] = `url(img/logo-${local}.png)`
        $('.toggle').hide()
        $('.'+local).show()
        // TODO : especializar categorias y productos por local
        this.data.locales.forEach(loc => {
            loc.marker && loc.marker.setMap(loc.nombre == local ? this.data.map : null)
        })
        $('[href="#inicio"]').click()
    },

    imgFallback(e) {
        e.target.src = 'img/comidas.png'
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
            return food.data.categorias.remove(cat)
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


}

food
.config(config)
.init({
    theme: "cucina light",
})
