<template>
  <header id="header">
    <router-link :to="{ name: 'Home'}" class="home-link">
      <div class="titles">
        <div class="glitch">
          <h1 class="title" data-text="//CHRISTIAAN BRANT">//CHRISTIAAN BRANT</h1>
        </div>
        <h3 class="sub-title">//PORTFOLIO</h3>
      </div>
    </router-link>
    <nav id="categories-desktop">
      <router-link v-for="category of orderedCategories" :key="category.name" class="category" :to="{name: category.name === 'Home' ? 'Home' : 'Category', params: category.name === 'Home' ? null : {categoryId:category.id}}">{{category.name}}</router-link>
      <UserConditional>
        <template v-slot:user="{user}">
          <a v-if="user" href="#" class="category categories" @click="openCategoriesModal()"><span class="material-icons">edit</span></a>
          <a v-if="user" href="#" class="category Sign-in" @click="auth.signOut()"><span class="material-icons">logout</span></a>
        </template>
      </UserConditional>
    </nav>
    <nav id="categories-mobile">
      <a href="javascript:void(0);" @click="toggleMobileMenu"><span class="material-icons">menu</span></a>
      <div id="mobile-menu">
        <router-link v-for="category of orderedCategories" :key="category.name" class="category" :to="{name: category.name === 'Home' ? 'Home' : 'Category', params: category.name === 'Home' ? null : {categoryId:category.id}}">{{category.name}}</router-link>
        <UserConditional>
          <template v-slot:user="{user}">
            <div v-if="user" class="user-actions">
              <a href="#" class="category categories" @click="openCategoriesModal()"><span class="material-icons">edit</span></a>
              <a href="#" class="category Sign-in" @click="auth.signOut()"><span class="material-icons">logout</span></a>
            </div>

          </template>
        </UserConditional>
      </div>
    </nav>
  </header>
</template>

<script>
import {auth, db} from "@/firebase";
import {ModalBus} from "@/events";
import UserConditional from "@/components/UserConditional";
import CategoryForm from "@/components/CategoryForm";

export default {
  components:{
    UserConditional
  },
  data(){
    return {
      auth,
      categories: [],
      navbarOffset: 0,
    }
  },
  firestore(){
    return {
      categories: db.collection("categories")
    }
  },
  computed:{
    orderedCategories: function()  {
      return [...this.categories].sort((a, b) => a.rank - b.rank);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleStickyScroll);
    const navbar = document.getElementById("categories-mobile");
    this.navbarOffset = navbar.offsetTop;
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleStickyScroll);
  },
  methods:{
    openCategoriesModal(){
      ModalBus.$emit("open", {
        component: CategoryForm,
        title: "Categories"
      });
    },
    toggleMobileMenu(){
      const menu = document.getElementById("mobile-menu");

      if (menu.style.display === "grid") {
        menu.style.display = "none";
      } else {
        menu.style.display = "grid";
      }
    },
    handleStickyScroll (){
      const navbar = document.getElementById("categories-mobile");
      const menu = document.getElementById("mobile-menu");
      const header = document.getElementById("header");

      menu.style.display = "none";

      if (window.pageYOffset >= this.navbarOffset) {
        navbar.classList.add("sticky");
        header.style.marginBottom = "1rem";
      } else {
        navbar.classList.remove("sticky");
        header.style.marginBottom = "0rem";
      }
    }
  }
}
</script>

<style scoped lang="scss">
header{
  padding-top: 1rem;
  background-color: $black-light;

  .home-link {
    display: grid;
    justify-content: center;
    max-width: 95vw;
    overflow-x: hidden;
    margin: 0 auto;

    .titles {
      color: $blue-light;

      .glitch{
        margin-bottom: 0.5rem;
        position: relative;

        @media only screen and (max-width: 599px) {
          .title {
            font-size: 1.5rem;
          }
          .sub-title{
            font-size: 1rem;
          }
        }

        & > * {
          text-align: inherit;
          line-height: 1;
          animation: glitch-anim 1s infinite alternate;

          &:before,
          &:after {
            text-align: inherit;
            width: 100%;
            content: attr(data-text);
            opacity: 1;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }

          &:before {
            color: $pink;
            left: -0.2rem;
            overflow: hidden;
            animation: glitch-anim-before 5s infinite alternate;
            z-index: -1;
            clip-path: inset(0 0 60% 0);
          }

          &:after {
            color: $blue-dark;
            left: 0.2rem;
            overflow: hidden;
            animation: glitch-anim-after 5s infinite alternate;
            z-index: -2;
            clip-path: inset(40% 0 0 0);
          }
        }
      }
    }
  }
  #categories-desktop {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    padding-top: 1rem;

    @media only screen and (max-width: 599px) {
      display: none;
    }

    a {
      transition: all 0.1s ease-in-out;
      color: $blue-light;
      font-size: 1.2rem;
      background-color: $black-light;
      padding: 0.5rem 1rem;

      &.router-link-active,
      &:hover {
        background-color: $black-dark;
      }
    }
  }
  #categories-mobile {
    overflow: hidden;
    display: grid;
    z-index: 10;
    background-color: $black-light;

    @media only screen and (min-width: 600px) {
      display: none;
    }
    & > a {
      justify-self: end;
      margin-right: 1rem;
      padding: 0.5rem 0.5rem 0.2rem 0.5rem;
      margin-bottom: 0.5rem;

      span {
        font-size: 2rem;
      }

      &:hover {
        background-color: $black-dark;
      }
    }

    #mobile-menu {
      display: none;

      a {
        padding: 0.5rem 1.5rem;
        color: $blue-light;

        &.router-link-active,
        &:hover {
          background-color: $black-dark;
        }
      }

      .user-actions {
        display: flex;
        justify-content: space-evenly;

      }
    }
  }
  .sticky {
    width: 100%;
    position: fixed;
    top: 0;
  }
}

@keyframes glitch-anim {
  0% {
    clip: rect(93px, 9999px, 15px, 0);
    transform: skew(2.05deg);
  }
  5% {
    clip: rect(25px, 9999px, 6px, 0);
    transform: skew(1.2deg);
  }
  10% {
    clip: rect(9px, 9999px, 53px, 0);
    transform: skew(2.75deg);
  }
  15% {
    clip: rect(66px, 9999px, 22px, 0);
    transform: skew(3.7deg);
  }
  20% {
    clip: rect(79px, 9999px, 38px, 0);
    transform: skew(0.8deg);
  }
  25% {
    clip: rect(7px, 9999px, 39px, 0);
    transform: skew(0.2deg);
  }
  30% {
    clip: rect(12px, 9999px, 75px, 0);
    transform: skew(4.6deg);
  }
  35% {
    clip: rect(89px, 9999px, 68px, 0);
    transform: skew(3.6deg);
  }
  40% {
    clip: rect(45px, 9999px, 67px, 0);
    transform: skew(1.9deg);
  }
  45% {
    clip: rect(35px, 9999px, 61px, 0);
    transform: skew(1.6deg);
  }
  50% {
    clip: rect(35px, 9999px, 60px, 0);
    transform: skew(0.9deg);
  }
  55% {
    clip: rect(93px, 9999px, 88px, 0);
    transform: skew(0.9deg);
  }
  60% {
    clip: rect(53px, 9999px, 7px, 0);
    transform: skew(0.2deg);
  }
  65% {
    clip: rect(63px, 9999px, 27px, 0);
    transform: skew(1.9deg);
  }
  70% {
    clip: rect(48px, 9999px, 34px, 0);
    transform: skew(1deg);
  }
  75% {
    clip: rect(28px, 9999px, 70px, 0);
    transform: skew(0.05deg);
  }
  80% {
    clip: rect(34px, 9999px, 19px, 0);
    transform: skew(4.9deg);
  }
  85% {
    clip: rect(12px, 9999px, 100px, 0);
    transform: skew(2.05deg);
  }
  90% {
    clip: rect(85px, 9999px, 100px, 0);
    transform: skew(0.7deg);
  }
  95% {
    clip: rect(62px, 9999px, 18px, 0);
    transform: skew(3.25deg);
  }
  100% {
    clip: rect(34px, 9999px, 96px, 0);
    transform: skew(3deg);
  }
}
@keyframes glitch-anim-before {
  0% {
    clip-path: inset(0 0 90% 0);
  }
  29% {
    clip-path: inset(0 0 90% 0);
  }
  30% {
    clip-path: inset(0 0 70% 0);
  }
  60% {
    clip-path: inset(0 0 40% 0);
  }
  80% {
    clip-path: inset(0 0 45% 0);
  }
  to {
    clip-path: inset(0 0 15% 0);
  }
}
@keyframes glitch-anim-after {
  0% {
    clip-path: inset(10% 0 0 0);
  }
  29% {
    clip-path: inset(10% 0 0 0);
  }
  30% {
    clip-path: inset(30% 0 0 0);
  }
  60% {
    clip-path: inset(60% 0 0 0);
  }
  80% {
    clip-path: inset(55% 0 0 0);
  }
  to {
    clip-path: inset(85% 0 0 0);
  }
}
</style>