import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import Resume from '@/page/resume/resume'
import job from '@/page/job/job'
import JobDetails from '@/page/job/job_detail'
import Company from '@/page/company/company'
import CompanyDetails from '@/page/company/company_detail'
import Login from '@/page/login/login'
import Demo from '../page/demo/demo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },{
      path: '/job',
      name: 'job',
      component: job
    },
    {
      path: '/job_details',
      name: 'job_details',
      component: JobDetails

    },{
      path: '/company',
      name: 'company',
      component: Company
    },{
      path: '/company_details',
      name: 'company_details',
      component: CompanyDetails
    },{
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
