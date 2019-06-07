import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.remote.DesiredCapabilities

def pwd = System.properties['user.dir']
System.setProperty('webdriver.gecko.driver',"${pwd}/src/test/resources/webdrivers/mac/geckodriver")

driver = { 
  DesiredCapabilities dc = DesiredCapabilities.firefox()
  dc.setCapability("marionette", true)
  new FirefoxDriver(dc)
}
