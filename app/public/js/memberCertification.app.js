var mcApp = new Vue ({
  el: '#memberCertificationVue',
  data: {

    mcList:[],
    certList:[],
    mbrList:[],
    mbrNmcList:[],

    newMC:{
      memberID:'',
      certificationID:'',
      renewedDate:'',
      expirationDate:''
    },
    selectedMemberCert:{
      memberID:'',
      certificationID:'',
      renewedDate:'',
      expirationDate:''
    }
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

    fetchCertification(){
          fetch('api/certifications/')
          .then(response => response.json())
          .then(json => {
            this.certList=json;
            console.log(this.certList);
          });
        },

    fetchmember() {
          fetch('api/member/')
          .then( response => response.json() )
          .then( json => {
            this.mbrList = json;
            console.log(this.mbrList);
          });
          },

     fetchmemberandcertification() {
            fetch('api/member/')
            .then( response => response.json() )
            .then( json => {
              this.mbrList = json;
              console.log(this.mbrList);
            });
            fetch('api/memberCertification/')
            .then( response => response.json() )
            .then( json => {
              this.mcList = json;
              console.log(this.mcList);
            });
            fetch('api/certifications/')
            .then(response => response.json())
            .then(json => {
              this.certList = json;
              console.log(this.certList);
            });
            },

      createMemberCertification(){
        fetch('api/memberCertification/create.php',{
          method:'POST',
          body: JSON.stringify(this.selectedMemberCert),
          headers:{
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          this.mcList = json;
          this.newMC = this.newMCData();
      });
      console.log("Creating (POSTing)...!");
      console.log(this.selectedMemberCert);
    },
    deleteMC(mcID) {
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
    },
    addMemberCert(){

    }
  },

      created() {
        this.fetchmemberandcertification();

        // this.fetchMemberCertification();
      }
    })
