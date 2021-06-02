<script>
export default {
    computed: {
        cssGridVariables(){
            return {
                "--nbCols" : this.nbCols,
                "--nbRows" : this.nbRows
            }
        }
    },
}
</script>