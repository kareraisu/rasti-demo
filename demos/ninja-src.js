(function (head, ...sources){
    var s, inject = (sources) => {
        s = document.createElement('script')
        s.src = sources.shift()
        if (sources.length) s.onload = () => inject(sources)
        head.append(s)
    }
    inject(sources)
    document.querySelector('#ninja-src').remove()
})(document.querySelector('head'),
    location.hostname == 'localhost' ? '/dist/rasti.js'
    : 'https://raw.githubusercontent.com/kareraisu/rasti.js/master/dist/rasti.min.js')