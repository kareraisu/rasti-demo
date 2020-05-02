const config = {

    data : {

        polls : [],

        años : 'Select 2017 2018 2019'.split(' '),

        colors : 'E02B00 E08900 E0C600 8ED200 21BB00'.split(' '),

        materias(render, deps) {
            if (!this.data.polls) return
            const materias = Array.from(new Set(
                this.data.polls
                    .filter(el => el.año == deps.año)
                    .map(el => el.materia)
            ))
            render(materias)
        },

        catedras(render, deps) {
            if (!this.data.polls) return
            const catedras = Array.from(new Set(
                this.data.polls
                    .filter(el => el.año == deps.año
                        && el.materia == deps.materia)
                    .map(el => el.catedra)
            ))
            render(catedras)
        },
    },

    methods : {

        selectCatedra(e) {
            const polls = this.data.polls
                .filter(el => el.año == this.props.año
                    && el.materia == this.props.materia
                    && el.catedra == this.props.catedra)

            function calc(n) {
                const quantity = polls.filter(el => el.score_gral == (''+n)).length
                const percent = (quantity / polls.length * 100).toFixed()
                return {q: quantity, p: percent}
            }

            const stats = {
                n: polls.length,
                c5: calc(5),
                c4: calc(4),
                c3: calc(3),
                c2: calc(2),
                c1: calc(1),
            }
            stats.prom = ((5 * stats.c5.q + 4 * stats.c4.q + 3 * stats.c3.q
                + 2 * stats.c2.q + stats.c1.q) / stats.n).toFixed(1)
            stats.color = '#' + this.data.colors[Math.floor(stats.prom) -1]

            app.render('polls', polls)
            app.render('stats', stats)

            return this.methods
        },

        getPolls() {
            fetch('./MOCK_DATA.json')
                .then(res => res.json())
                .then(data => {
                    this.data.polls = data
                        .map(el => ({
                            color: '#' + this.data.colors[parseInt(el.score_gral) -1],
                            ...el
                        }))
                })
            return this.methods
        },

        toggleTheme(e) {
            const variant = this.props.light ? 'light' : 'dark'
            app.setTheme('base '+ variant)
            return this.methods
        },

    }

}

app
.config(config)
.init({persist: false})
.methods
.getPolls()
