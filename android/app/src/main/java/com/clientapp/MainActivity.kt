package com.clientapp

import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "ClientApp"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)

    // 알림 채널 생성
    createNotificationChannel()
  }

  /**
   * Creates a notification channel for Android 8.0+.
   */
  private fun createNotificationChannel() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val channelId = "default_channel_id"
      val channelName = "Default Channel"
      val descriptionText = "This is the default notification channel for the app."
      val importance = NotificationManager.IMPORTANCE_HIGH // 헤드업 알림을 위해 중요도 설정
      val channel = NotificationChannel(channelId, channelName, importance).apply {
        description = descriptionText
      }
      val notificationManager = getSystemService(NotificationManager::class.java)
      notificationManager?.createNotificationChannel(channel)
    }
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
