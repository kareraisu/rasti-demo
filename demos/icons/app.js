const is = rasti.utils.is

const config = {

    props : {
        category : 'app',
        size : 1,
        mode : false,
        shade : false,
    },

    data : {
        categories : [...Object.keys(rasti.icons), 'all'],
        icons : Object.fromEntries( Object.keys(rasti.icons).map(cat => [ cat, Object.keys(rasti.icons[cat]) ]) ),
        palette : `
            darkred firebrick brown indianred sienna
            chocolate orange gold goldenrod darkgoldenrod
            olive olivedrab darkolivegreen darkgreen seagreen mediumseagreen
            darkcyan lightseagreen darkturquoise
            deepskyblue dodgerblue skyblue cornflowerblue royalblue
            darkslateblue mediumpurple blueviolet indigo darkorchid orchid darkmagenta
            palevioletred salmon tomato coral lightsalmon
            burlywood navajowhite peachpuff
            lightgray darkgray gray lightslategray slategray darkslategray
        `,
    },

    methods : {

        search(e) {
            if (e && e.key != 'Enter') return
            if (this.props.search) this.render('icons', this.props.search.split(' '))
        },

        changeSize(e) {
            const el = $('[template=icons]')[0]
            const classes = el.className
            const sizes = 'small base big huge'.split(' ')
            this.props.sizeName = sizes[this.props.size]
            let found = false
            sizes.forEach((m, i) => {
                if (classes.includes(m+'_')) {
                    el.className = classes.replace(m+'_', this.props.sizeName+'_')
                    found = true
                }
            })
            if (!found) el.classList.add(this.props.sizeName+'_')
            return this.methods
        },

        selectCategory(e) {
            const cat = e && (is.string(e) ? e : $(e.target).attr('value'))
            const current = this.props.category
            const isValid = this.data.categories.includes(cat)
            const isDiff = cat !== current
            if ( cat && !isValid ) rasti.warn(`Unknown category "${cat}"`)
            if ( (isValid && isDiff) || (!cat && current) ) {
                if (cat) this.props.category = cat
                const icons = this.props.category == 'all'
                    ? Object.values(this.data.icons).flat()
                    : this.data.icons[this.props.category]
                this.render('icons', icons)
                this.sidemenu.hide()
            }
            return this.methods
        },

        changeColor(e) {
            if (!this.props.colorName) this.props.colorName = this.data.palette[0]
            if (e) {
                e.preventDefault()
                this.props.colorName = e.target.value || $(e.target).attr('value')
            }
            document.body.style.setProperty("--primary", this.props.colorName)
            return this.methods
        },

        toggleShade(e) {
            if (e) {
                this.props.shade = !this.props.shade
                e.target.classList.toggle('active')
            }
            document.body.style.setProperty("--icon_color", this.props.shade ? '#111' : '#eee')
            return this.methods
        },

        toggleMode(e) {
            if (e) {
                this.props.mode = !this.props.mode
                e.target.classList.toggle('active')
            }
            document.body.style.setProperty("--icon_font", this.props.mode ? 'Segoe UI Symbol' : 'inherit')
            return this.methods
        },

    }

}

icons_demo
    .config(config)
    .init({persist: true})
    .methods
        .changeColor()
        .changeSize()
        .toggleMode()
        .toggleShade()
        .selectCategory()
