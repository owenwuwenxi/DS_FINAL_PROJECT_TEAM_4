var mcApp = new Vue ({
  el: '#memberCertification',
  data: {

    mcList:[],

    newMC:{
      memberID:'',
      certificationID:'',
      renewedDate:'',
      expirationDate:'',
      expired:''
    },
  },


  methods:{
    fetchMemberCertification() {
      fetch('api/memberCertification/')
      .then( response => response.json() )
      .then( json => {
        this.mcList = json;
        console.log(this.mcList);
      });
      },

      createdMemberCertification(){
        fetch('api/memberCertification/create.php',{
          method:'POST',
          body: JSON.stringify(this.newMC),
          headers:{
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.mcList.push(json[0]);
          this.newMC = this.newMCData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.newMC);
    },
    deleteMc(mcID) {
      fetch('api/memberCertification/delete.php',{
        method:'POST',
        body: JSON.stringify({"mcID":mcID}),
        headers:{
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => {
        this.mcList = json;
        //do the right stuff here
    });
    },
    newMCData(){
      return {
        memberID:'',
        certificationID:'',
        renewedDate:'',
        expirationDate:'',
        expired:''
      }
    }
  },

      created() {
        this.fetchMemberCertification();
      }
    })
