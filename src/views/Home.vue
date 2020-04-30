<template>
  <div class="home mx-3 mx-lg-5">
    <p class="text-center">このサイトは、「<strong>全脳アーキテクチャ若手の会</strong>」過去の資料をまとめたものです。</p>
    <Index />
    <Documents />
  </div>
</template>

<script>
  import Index from "../components/Index";
  import Documents from "../components/Documents";

  export default {
    name: "home",
    components: {
      Index,
      Documents
    }
  }
</script>