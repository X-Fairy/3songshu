<template>
    <p class="p2" :endTime="endTime" :callback="callback" :endText="endText">
        <i>{{hours}}</i>:<i>{{minutes}}</i>:<i>{{seconds}}</i>.<i>{{milliseconds}}</i>
    </p>
</template>
<script>
    export default {
        data(){
           return {
               hours:0,
               minutes:0,
               seconds:0,
               milliseconds:0,
               pageTimer:{}
           }
        },
        props:{
            endTime:{
                type: String,
                default :'0'
            },
            endText:{
               type : String,
               default:'已结束'
            },
            callback : {
                type : Function,
                default :''
            }
        },
        mounted () {
            this.countdowm(this.endTime);

        },
        watch:{
            endTime(curVal,oldVal){
                if(this.pageTimer){   //清除所有的定时器，防止传过来的值变化出现闪烁的问题
                    for(let each in this.pageTimer){
                        clearInterval(this.pageTimer[each]);
                    }
                }
               
            }
        },
        methods: {
           countdowm(){
                let self = this;
                this.pageTimer["timer1"] = setInterval(function(){
                    let nowTime = new Date();
                    let endTime = new Date((nowTime/1000+86400)*1000);
                    let t = endTime.getTime()+ - nowTime.getTime();
                    // console.log(t);
                    if(t>0){
                        let hour=Math.floor(t/3600000);
                        let min=Math.floor((t/60000)%60);
                        let sec=Math.floor((t/1000)%60);
                        hour = hour < 10 ? "0" + hour : hour;
                        min = min < 10 ? "0" + min : min;
                        sec = sec < 10 ? "0" + sec : sec;
                        self.hours = hour;
                        self.minutes = min;
                        self.seconds = sec;
                        let millSeconds = 9;
                        self.pageTimer["timer1"] = setInterval(function () {
                            self.milliseconds = millSeconds;
                            millSeconds--;
                            if (millSeconds < 0) {
                                millSeconds = 9
                            }
                        }, 100);
                    }else{
                        clearInterval(self.pageTimer["timer1"]);
                        self.hours = 0;
                        self.minutes = 0;
                        self.seconds = 0;
                        self.milliseconds = 0;
                        self._callback();
                    }
                },1000);
            },
           _callback(){
               if(this.callback && this.callback instanceof Function){
                     this.callback(...this);
               }
           }
        }
    }
</script>