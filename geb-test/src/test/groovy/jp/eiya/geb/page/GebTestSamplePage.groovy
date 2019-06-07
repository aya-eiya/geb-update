package jp.eiya.geb.page

import geb.Page

class GebTestSamplePage extends Page {
  static url = 'http://localhost:8080/'

  static at = {
    title == 'Geb Test sample page'
  }

  static content = {
    todoInput { $('input[placeholder=TODO]') }
    todoAdd { $('button')[0] }
    lastTodoContent { $('.b_list>.last .col_title') }
  }

}