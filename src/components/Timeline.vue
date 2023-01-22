<template>
  <section id="lnk-linha-tempo" class="panel panel--collapse ng-scope"
    ng-controller="LinhaTempoController as vmLinhaTempo">
    <article class="panel__body">
      <ul class="timeline ng-isolate-scope timeline--default" tabindex="0" role="list" aria-label="Linha do tempo." style="font-size:12px">
        <EventoTimeline v-for="f in fases" :key="f.id"  :fase="f"/>
      </ul>
    </article>
  </section>
</template>

<script>
  import EventoTimeline from './EventoTimeline';
export default {

  name: "Timeline",
  props: {
    fases: []
  },
  components: {
    EventoTimeline
  },
  data() {
    return {
     
      lines: []
    };

  }, mounted() {
    this.aumenta()

  }, methods: {

    aumenta: function () {

      for (let i = 0; i < 10; i++) {
        this.lines.push(i)
      }
    }
  }
};
</script>

<style >
/*! gaw-timeline - v1.0.22 - 2018-12-11 */
.timeline {
  color: rgba(38, 50, 56, .85);
  font-size: 5.2rem;
  letter-spacing: .1px;
  list-style: none;
  padding-left: 10;
  text-align: left;
  overflow: hidden
}

.timeline.timeline--spaced article {
  margin-left: 1.6rem;
  padding-left: 1.5rem
}

.timeline.timeline--compact article:after {
  top: 1rem
}

.timeline>li {
  display: -ms-flexbox;
  display: flex
}

.timeline>li.timeline--compact--no-image article:after {
  top: 1.5rem
}

.timeline>li:first-child article::after {
  background-color: #fff
}

.timeline time {
  font-size: .2rem;
  text-align: right;
  width: 6.9rem;
  margin-top: .1rem
}

.timeline time>small {
  display: block;
  font-size: .2rem
}

.timeline article {
  margin-left: 1rem;
  padding: 0 0 1rem 1rem;
  position: relative;
  width: 100%
}

.timeline article::after,
.timeline article::before {
  background-color: #979797;
  content: '';
  position: absolute
}

.timeline article::before {
  height: 150%;
  left: -1px;
  top: .5rem;
  width: 1px
}

.timeline article::after {
  border: .25rem solid #979797;
  border-radius: 100%;
  display: block;
  height: 6px;
  left: -7px;
  top: 5px;
  width: 6px
}

.timeline article p {
  color: rgba(38, 50, 56, .9)
}

.timeline article p:last-of-type {
  margin-bottom: 0
}

.timeline article small {
  font-size: .2rem
}

.timeline>.timeline--danger article::before {
  background-color: #d9534f
}

.timeline>.timeline--danger article::after {
  background-color: #d9534f;
  border: .25rem solid #d9534f
}

.timeline>.timeline--warning article::before {
  background-color: #f0b74e
}

.timeline>.timeline--warning article::after {
  background-color: #f0b74e;
  border: .25rem solid #f0b74e
}

.timeline>.timeline--info article::before {
  background-color: #5bc0de
}

.timeline>.timeline--info article::after {
  background-color: #5bc0de;
  border: .25rem solid #5bc0de
}

.timeline>.timeline--success article::before {
  background-color: #8bc34a
}

.timeline>.timeline--success article::after {
  background-color: #8bc34a;
  border: .25rem solid #8bc34a
}

.timeline>.timeline--primary article::before {
  background-color: #007acc
}

.timeline>.timeline--primary article::after {
  background-color: #007acc;
  border: .25rem solid #007acc
}

.timeline--compact img,
.timeline--default img {
  object-fit: cover;
  width: 28px;
  height: 28px;
  border-radius: 50%
}

.timeline .is-open .timeline__details {
  max-height: 32rem
}

.timeline__details {
  font-size: .2rem;
  margin-top: .5rem;
  max-height: 0;
  overflow: hidden;
  position: relative;
  transition: max-height .3s ease-in
}

.timeline--compact i,
.timeline--compact img,
.timeline--default i,
.timeline--default img {
  position: absolute;
  left: 0;
  transform: translateX(-50%);
  z-index: 20
}

.timeline--compact i {
  top: 20px
}

.timeline--compact img {
  top: 18px
}

.timeline--default i {
  top: 9px
}

.timeline--default img {
  top: 7px
}

.timeline article.timeline__icon,
.timeline article.timeline__image {
  cursor: pointer;
  position: relative;
  z-index: 1
}

.timeline article.timeline__icon:after,
.timeline article.timeline__image:after {
  height: 2rem;
  width: 2rem;
  left: -1rem;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-family: "Material Icons";
  -moz-font-feature-settings: 'liga' 1;
  font-feature-settings: 'liga' 1;
  font-style: normal;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1;
  text-rendering: auto;
  text-transform: none;
  word-wrap: normal;
  font-size: .5rem;
  text-align: center;
  padding-top: 2px;
  background-color: #fff;
  border-width: 2px !important
}
</style>
