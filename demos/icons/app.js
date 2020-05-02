const config = {

    props : {
        category: 'app',
        size : 1,
        bg_color: 0,
        mode: false,
        shade: false,
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
        `.trim().split(/[\n\s]+/),
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

        incSize(e) {
            if (this.props.size < 3) this.props.size++
        },

        decSize(e) {
            if (this.props.size > 0) this.props.size--
        },

        selectCategory(e) {
            let newCat = e && (is.string(e) ? e : $(e.target).attr('value'))
            if (newCat) this.props.category = newCat
            const icons = this.props.category == 'all'
                ? Object.values(this.data.icons).flat()
                : this.data.icons[this.props.category]
            this.render('icons', icons)
            this.sidemenu.hide()
            return this.methods
        },

        changeColor(e) {
            e && e.preventDefault()
            this.props.colorName = e
                ? e.target.value || $(e.target).attr('value')
                : this.data.palette[this.props.bg_color]
            document.body.style.setProperty("--bg_color", this.props.colorName)
            this.render('stats')
            return this.methods
        },

        toggleShade(e) {
            if (e) {
                this.props.shade = !this.props.shade
                e.target.classList.toggle('active')
            }
            document.body.style.setProperty("--icon_color", this.props.shade ? '#0004' : '#fff4')
            return this.methods
        },

        toggleMode(e) {
            if (e) this.props.mode = !this.props.mode
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
    .toggleMode()
    .toggleShade()
    .selectCategory()
