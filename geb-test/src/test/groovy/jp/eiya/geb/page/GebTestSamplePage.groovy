package jp.eiya.geb.page

import geb.Page

class GebTestSamplePage extends Page {
  static url = 'http://localhost:8080/'

  static at = {
    title == 'Geb Test Sample page'
  }

}